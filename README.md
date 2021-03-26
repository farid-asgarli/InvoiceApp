# InvoiceApp

Project is built using .NET Core 5 and React with Typescript.

Solution consists of 4 projects : API (where Startup.cs and Program.cs are located), Domain (for Models), Application (For application logic), Persistence (for database).

So in order to run the project, just head to /InvoiceApp/API and in CLI, use :

                  dotnet watch run

The necessary data will be seeded and database will be created on the run, so you do not need a database file.


Credentials:

Admin Login:

bob@test.com
Pa$$w0rd

User Login

leon@test.com / jill@test.com
Pa$$word


This project uses production build of React, which is Loacated inside /InvoiceApp/API/wwwroot.

To see the contents of development build of React, head to /InvoiceApp/client-app

In case if you desire to start the development server for the React application, first head to /InvoiceApp/client-app

Then run the following command:

          npm install

After the process is finished and necessary packages are installed, run the following command to start the development server:

          npm start



