# For the Backend:

- go to directory backend:

- run command:

- composer update

- Create .env with:<br><br>

<code>
APP_URL=http://localhost:8000 <br>
DB_CONNECTION=mysql<br>
DB_HOST=127.0.0.1<br>
DB_PORT=3306<br>
DB_DATABASE= "Database Name"<br>
DB_USERNAME=root<br>
DB_PASSWORD=<br><br>
</code>


- run the command:<br><br>

<code>php artisan key:generate</code><br><br>

- create database Mysql

- run the commands:<br><br>

<code>php artisan migrate

php artisan passport:install

php artisan db:seed

php artisan storage:link

and finnaly run:

php artisan serve<br>
</code>
<br>

# For the Frontend:

- run the command:

<code>npm install</code>

and 

<code>ng build</code>

<code>ng serve</code>

Default Credencials for admin

<code>email: admin@uphiil.com<br>
password: password</code>


Done!