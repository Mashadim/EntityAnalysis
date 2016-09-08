# Entity Analysis

Have an article that you want to get entity data(ie. dates, people, organization, email etc.) from without manually reading line by line?

+ Entity Analysis takes url or word(s) and instantly extracts entities.
+ Stores searches in a previous search column.
+ Click any of the previous searches to review previous entities rendered.
+ Search for articles matching an entity you are looking for(will be searched from previously searched articles).
+ State is saved in local storage so simply return to view previous article/entities when needed.

+ Created with React/Redux, PostgreSQL, Node/Hapi.js and other tools. 
+ Entities saved in PostgreSQL to reduce network requests to third-party API and to take data out of state for better performance.
+ Utilized methods such as shouldComponentUpdate and only connecting Components to props they will use rather than the entire state. This stops re-rendering when nothing has changed and improves app optimization.
+ Set up back-end Authentication.
+ Added tests.

#### Currently Working on

+ Setting up front-end authentication to work with back-end authentication. Thus for now go to *Start Extraction* link to get started, there is no need to signup/signin as it is not currently working.

## Get Started

You will need to configure a few files in the *config folder* before getting started:

+ Sign up to obtain an *Aylien* ID and API key.
+ Have PostgreSQL installed on your OS. Include your username and password.

Once you have that setup:

+ run *npm start* in one tab in your terminal.
+ run *npm run dev* in another tab.
+ run *psql entitydb in another tab. ( *\d* to see all tables, *\x* to see tables in better view, *SELECT \* FROM TABLENAMEHERE* to access the table, *\q* to exit*).

If you plan to reuse please make sure to .gitignore things like your API key and PostgreSQL username/password:

*In .gitignore :*

    node_modules   
    config/aylien.config.js   
    config/database.config.js   
    config/config.js   
    npm_debug.log   
    .DS_Store   
    dist/
		