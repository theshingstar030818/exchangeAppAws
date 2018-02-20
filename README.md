### Running the app

Now the app is configured and wired up to the AWS Mobile Hub and AWS services. To run the app in the browser, run

```bash
ionic serve
```

To run the app on device, first add a platform, and then run it:

```bash
ionic cordova platform add ios
ionic cordova run ios
```

Or open the platform-specific project in the relevant IDE:

```bash
open platforms/ios/MyApp.xcodeproj
```

### Hosting app on Amazon S3

Since your Ionic app is just a web app, it can be hosted as a static website in an Amazon S3 bucket.

```
npm run build
awsmobile publish
```
