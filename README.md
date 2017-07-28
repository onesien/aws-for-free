# aws-for-free

## The App
This app was created using create-react-app for more information you can read the the readme in the app dir.

Steps to get started with the app:
* make sure you are using the latest node version 6+
* `npm install`
* `npm start`

This will get a local version of you app running at `http://localhost:300` with hot reloading.

Steps to put application on the internet:
* Create an AWS s3 bucket on amazon.
* Once the bucket is created, enable `Static Website Hosting` for the bucket under the properties tab
* Create an AWS user that has permissions to that bucket.
* Create a profile in your `~/.aws/credentials` 
```
[aws-for-free] 
aws_access_key_id = ... 
aws_secret_access_key = ...
```
* `npm run build`
* `aws s3 cp build s3://{NAME_OF_BUCKET}/ --recursive --region {REGION_OF_BUCKET} --acl public-read --profile aws-for-free`

This will push the contents of the build folder to the bucket you created


