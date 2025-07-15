git clone https://github.com/jnmio/aws-amplify-angular-template-jnmio.git  <your-app-name>

delete the .git directory so you can initialize a new git tracking project.

open the directory with vs code or other editor.

create file amplify_outputs.json in the root directory. amplify stores all pertinant backend endpoints once the build is complete see amplify setup.

open terminal window. make sure you are in root of the app

run npm i to load the dependacies

ng build 

ng serve --port 4200

git init

push to your git repository

go to aws amplify and create a new app select the app from the drop down list

npx ampx generate outputs