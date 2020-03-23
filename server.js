const express = require ('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '18101094',
			name: 'Samin',
			email: 'samin@gmail.com',
			password: 'Mohsam17',
			walletId: '1234',
			walletBalance: 1000,
			hasTicket: false,
			joined: new Date()
		},
		{
			id: '18101237',
			name: 'Nabila',
			email: 'nabila@gmail.com',
			password: 'Nabila123',
			walletId: '1243',
			walletBalance: 500,
			hasTicket: true,
			joined: new Date()
		}
	]
}

app.get('/' ,(req,res)=>{
	res.send('Hello World');
})

app.post('/signin', (req,res)=>{
	if (req.body.id === database.users[0].id && req.body.password === database.users[0].password){
		res.json('success');
	} else {
		res.status(400).json('error logging in');
	}
})

app.post('/register', (req,res)=>{
	const { email, name, password } = req.body;
	database.users.push({
		id: '125',
		name: name,
		email: email,
		password: password,
		walletId: '1244',
		walletBalance: 0,
		hasTicket: false,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req,res) => {
	const { id } = req.params;
	let found = false; 
	database.users.forEach(user => {
		if (user.id === id){
			found = true;
			return res.json(user); 
		}
	})
	if (!found){
		res.status(404).json('not found');
	}
})



app.listen(3000, ()=>{ 
	console.log('server is running on port 3000');
})


/*

/ -->
/signin --> POST = success/fail
/register --> POST = user
/buyticket --> POST = success/fail
/profile/:id --> GET = user
/recharge --> POST success/fail
/ticket/:info --> GET = infos
/bus/:info --> GET = infos


*/