# InvoiceApp

Project is built using .NET Core 5 and React with Typescript.

Solution consists of 4 projects : API (where Startup.cs and Program.cs are located), Domain (for Models), Application (For application logic), Persistence (for database).

So in order to run the project, just head to /InvoiceApp/API and in CLI, use :

                  dotnet watch run

The necessary data will be seeded and database will be created on the run, so you do not need a database file.

This project uses production build of React, which is Loacated inside /InvoiceApp/API/wwwroot.

To see the contents of development build of React, head to /InvoiceApp/client-app
