Get started with the Identity Mixer Issuer sample application
Introduction

This sample application demonstrates how the IBM Identity Mixer service can enable privacy-preserving authentication for your customers.

Read and follow the instructions provided below. They are intended to help you copy the files in this IBM DevOps Service environment to your own, and assist you to deploy your own IBM Identity Mixer Issuer application to your own IBM Bluemix space.

A running implementation of the sample application is already available at https://mplex1.mybluemix.net/ for testing and demonstration.

The sample application source code provided in this project can help you write and deploy your own client application to leverage the Identity Mixer service's capabilities.

The following instructions explain how to copy the contents of this IBM DevOps Services project to your own IBM DevOps Services project, then build and deploy the sample application to your own Bluemix environment. 
If you are experienced at editing, building, committing and deploying IBM DevOps Services projects to IBM Bluemix, you can likely streamline some of the instruction below.

Before starting, consider a suitable application name and the URL for your IBM Identity Mixer sample client. The name you choose must be unique so that it doesn't clash with other developers' mybluemix.net app names.

Ensure that you have an IBM Bluemix account and the capability to deploy applications to the IBM Bluemix environment.

    Create two instances of the IBM Identity Mixer experimental service - one for issuance and one for verification:
        If you haven't already done so, login to IBM Bluemix.
        Create an empty Node.js application.
        Click Use Services or APIs.
        Go to the Bluemix Labs catalog (you have to scroll down to the bottom ob the Bluemix catalog).
		Click "IBM Identity Mixer" from within the "Security" section of the BluemixLabs catalog.
        Configure the Identity Mixer service in the "Add Service" section of the page:
            Select the Node.js APP that you just created to which to bind the service.
            Provide a suitable unique name for your Identity Mixer service if you'd prefer something another than the one suggested for you.
            The service is provided for free, so there is no plan to select.
            Having ensured the TERMS were acceptable to you, click CREATE.
            Click OK if Bluemix requests to restart your application.

    Setup your Issuer service:
        From the IBM Bluemix Dashboard, locate and click your recently-deployed Bluemix Node.js application to which you bound your new Identity Mixer issuer service.
        Within the Services section of the new Client application, click its Identity Mixer issuer service--the one you just bound to that Client application. 
		Choose the ISSUER role and press START SETUP.
        Choose a unique name for the Issuer (it must be unique within Bluemix not only your organization)
        Add *Credential specification(s)* (a list of the attributes that are contained in a credential) that will be issued by your application by selecting one of the options below:
			Select one of the existing specifications that are non-editable.
			Craft your own credential specification:
				Choose a unique name of the Credential Specification
				Specify a link to the image that will be an icon displayed in the user's credential wallet. You can also use the default image.
				Add Attributes to you specification by clicking ADD ATTRIBUTE, specifying a Human Readable Name and choosing a Data Type for each attribute
		When you are done, press NEXT.
		After Issuer crytographic keys are generated (this might take up to 3 min because of the key length - and is only done once) a JSON file with all configuration Information will be displayed.
		You can always see this file when selecting the service from the dashboard.
			
	Setup your Verifier service:
        From the IBM Bluemix Dashboard, locate and click your recently-deployed Bluemix Node.js application to which you bound your new Identity Mixer issuer service.
        Within the Services section of the new Client application, click its Identity Mixer issuer service--the one you just bound to that Client application. 
		Choose the VERIFIER role and press START SETUP.
        Choose a unique name for the Verifier (it must be unique within Bluemix not only your organization)
        Add *Credential specification(s)* (a list of the attributes that are contained in a credential) that will be issued by your application by selecting one of the options below:
			Select one of the existing specifications that are non-editable.
			Craft your own credential specification:
				Choose a unique name of the Credential Specification
				Specify a link to the image that will be an icon displayed in the user's credential wallet. You can also use the default image.
				Add Attributes to you specification by clicking ADD ATTRIBUTE, specifying a Human Readable Name and choosing a Data Type for each attribute
		When you are done, press NEXT.
		After Issuer crytographic keys are generated (this might take up to 3 min because of the key length - and is only done once) a JSON file with all configuration Information will be displayed.
		You can always see this file when selecting the service from the dashboard.

Ensure that you have an IBM DevOps Services account and the capability to manage an IBM DevOps Services project.

    Login to IBM DevOps Services using your IBM DevOps Services account.
        Click EXPLORE
        Search for "idemix" (without the quotes).
        Select the "idemix | verifier" project.
        To copy the Issuer project to your own new DevOps project:
            Click FORK.
            Select a suitable name for your new DevOps Services project. Decide whether to make it public or private, or add features for Scrum development.
            Check Deploy to Bluemix and select your Bluemix Organization and Bluemix Space. If you are advised that you require a Bluemix account, uncheck the Deploy to Bluemix option.
            Click Save. After a short time you should be taken to the project you just created. It should contain a copy of the Identity Mixer Issuer Sample Application resources.
            If you were not able to select the Deploy to Bluemix option:
                Ensure that you have an IBM Bluemix account and the capability to deploy applications to the IBM Bluemix environment.
                Click MY STUFF.
                Click the project name you just created.
                Click the Settings 'cog' icon (Settings) at the top-right of the page.
                Click OPTIONS.
                Check the Deploy to Bluemix option. Select the Bluemix Organization and Bluemix Space if possible.
                Click SAVE.
                Click EDIT CODE.
        Edit the manifest.yml file. If you are experienced with editing this type of file, edit it as you see fit. Otherwise:
            Click manifest.yml to edit its contents.
            Change both the host and name parameters from "unique_app_name" to the unique application name (without any quotes) you chose before you started.
            Save the manifest.yml file by selecting File>Save from the menu.
        Push your changes:
            Go to the Git Repository by clicking the 'branch' icon (Git Repository) directly under the editing-pencil on the left of the page.
            In the Changed Files section, select the check box to the left of the manifest.yml file to indicate that you want to commit the change you made.
            Provide an appropriate Commit message about how you changed the host and name parameters from "unique_app_name" to your unique application name.
            Click COMMIT 1 FILES.
            On the OUTGOING section under the Commits for the "master" branch, click PUSH to push your changes to the Remote branch.
        To build and Deploy the Identity Mixer Client sample application:
            Click BUILD & DEPLOY.
            If requested, click the Deploy to Bluemix link.
                Check the Deploy to Bluemix option. Select the Bluemix Organization and Bluemix Space if possible.
                Click SAVE.
                Click BUILD & DEPLOY.
            Click ADVANCED.
            Click the "configure builder" button (Settings). This will allow you to configure the packaging of your code.
                Select the Ant Builder.
                Select the master Branch.
                Leave the Build script path blank to use the Ant build.xml in the root folder.
                Leave the Build archive directory blank to use the root folder.
                Leave the Enable unit tests check box unchecked.
                Click SAVE.
            Click REQUEST BUILD and verify a green tick appears next to the Build and its version number.
            Click "add a stage". This will allow you to push the app instance to IBM Bluemix.
                Select IBM Bluemix (https://api.ng.bluemix.net) as the Target URL.
                Leave the Application name blank. You should have specified this in the manifest.yml file.
                Select the appropriate Bluemix Organization and Bluemix Space if necessary.
                Do not change the Script that IBM DevOps Services has provided for you.
                Click SAVE.
            Drag the build created in step 6 to the "Drop a build to deploy" area.
                Wait until a "Deployment Success" message and a green tick are displayed in your deployer area.
                You should see that your application has been deployed, and is running.


            

Note:

    If the application fails to build and/or deploy, review the steps above to remedy the issue.

    In the future, whenever you commit and push any changes to the code, the application should redeploy automatically to Bluemix. Click BUILD & DEPLOY to verify the deployment status, and to locate the link to your application.
