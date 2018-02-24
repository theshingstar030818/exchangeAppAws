import { Component, ViewChild } from '@angular/core';
import { Events, MenuController, Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Auth } from 'aws-amplify';

export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
  customIcon?: boolean;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  appPages: PageInterface[] = [
    { title: 'Coin Market Cap', name: 'CoinMarketCapPage', component: 'CoinMarketCapPage', icon: 'logo-bitcoin' },
    { title: 'News Feed', name: 'FeedPage', component: 'FeedPage', icon: 'ios-paper-outline' },
  ];

  loggedInPages: PageInterface[] = [
    // { title: 'Tasks', name: 'TabsPage', component: 'TabsPage', tabComponent: 'TasksPage', icon: 'ios-calendar-outline', customIcon: false },
    { title: 'Exchange', name: 'ExchangeTabsPage', component: 'ExchangeTabsPage', tabComponent: 'ExchangePage', icon: 'ios-trending-up-outline', customIcon: false },
    { title: 'Account', name: 'AccountPage', component: 'AccountPage', icon: 'person' },    
    { title: 'Support', name: 'SupportPage', component: 'SupportPage', icon: 'help' },
    { title: 'Settings', name: 'SettingsPage', component: 'SettingsPage', icon: 'cog' },
    { title: 'Logout', name: 'LoginPage', component: 'LoginPage', icon: 'log-out', logsOut: true }
  ];
  
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: 'LoginPage', icon: 'log-in' },
    { title: 'Support', name: 'SupportPage', component: 'SupportPage', icon: 'help' },
    { title: 'Signup', name: 'SignupPage', component: 'SignupPage', icon: 'person-add' }
  ];

  rootPage:any = null;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public events: Events,
    public menu: MenuController,
    public storage: Storage,
  ){
    
    // decide which menu items should be hidden by current login status stored in local storage
    this.storage.get(this.HAS_LOGGED_IN).then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.listenToLoginEvents();

    let globalActions = function() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    };

    platform.ready()
      .then(() => {
        Auth.currentAuthenticatedUser()
          .then(() => {
            this.storage.set(this.HAS_LOGGED_IN, true);
            this.enableMenu(true);
            this.rootPage = 'ExchangeTabsPage'; 
          }).catch(() => { 
            this.storage.set(this.HAS_LOGGED_IN, false);
            this.enableMenu(false);
            this.rootPage = 'LoginPage';
          }).then(() => globalActions());
      });
  }

  openPage(page: PageInterface) {
    let params = {};

    // the nav component was found using @ViewChild(Nav)
    // setRoot on the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      params = { tabIndex: page.index };
    }

    // If we are already on tabs just change the selected tab
    // don't setRoot again, this maintains the history stack of the
    // tabs even if changing them from the menu
    if (this.nav.getActiveChildNavs().length && page.index != undefined) {
    
      this.nav.getActiveChildNavs()[0].select(page.index);
    
    } else {

      // Set the root of the nav with params if it's a tab index
      this.nav.setRoot(page.name, params).catch((err: any) => {
        console.log(`Didn't set nav root: ${err}`);
      });
    
    }

    if (page.logsOut === true) {
      // Give the menu time to close before changing to logged out
      Auth.signOut()
      .then(() => { 
        this.events.publish('user:logout');
        this.rootPage = 'LoginPage';
      });
    }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.storage.set(this.HAS_LOGGED_IN, true);
      this.enableMenu(true);
    });
    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });
    this.events.subscribe('user:logout', () => {
      this.storage.remove(this.HAS_LOGGED_IN);
      this.enableMenu(false);
    });
    this.events.subscribe('menu:enableLoggedInMenu', (enable) => {
      this.menu.enable(enable, 'loggedInMenu');
    });
    this.events.subscribe('menu:enableLoggedOutMenu', (enable) => {
      this.menu.enable(enable, 'loggedOutMenu');
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  isActive(page: PageInterface) {
    let childNav = this.nav.getActiveChildNavs()[0];
    
    // Tabs are a special case because they have their own navigation
    if (childNav) {
      if (childNav.getSelected() && childNav.getSelected().parent._elementRef.nativeElement.id === page.component) {
        return 'primary';
      }
      return;
    }

    if (this.nav.getActive() && this.nav.getActive().name === page.name) {
      return 'primary';
    }
    return;
  }
}
