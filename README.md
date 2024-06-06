A webshop created with Typescript, Next.js, Sqlite(local), Prisma and Stripe.
*Admin page
*Delete/Add products
*Functional payment

There might be some error purchasing a product to register it to the database since the webhooks isn't enabled unless I log in to my Stripe account.

You can run the file on programs like Visual Studio Code
commands to run: 

npm i next

npm run dev

You can also access the admin page with "/admin" after your baseURL: 

username: admin

password: password

you can "test" buy products with typing in "4242 4242 4242 4242" in the Card number section
