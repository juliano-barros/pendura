export const PATHS = {
	home: '/home',
	profile: '/profile',
	user: '/user/user',
	product: '/product',
	product_form: '/product/:id',
	product_form_delete: '/product/:id/delete',
	register: '/user/register',
	friends: '/userFriends',
}

export const ROUTES = [
	{
		name: 'Tabelas',
		path: null,
		icon: 'fa-database',
		children: [
			{
				name: 'Produtos',
				path: '/product',
				icon: 'fa-industry',
				children:[]
			}
		]
	},
	{
		name: 'Amigos',
		path: null,
		icon: 'fa-group',
		children: [
			{
				name: ' Solicitação de amizade',
				path: '/userFriends',
				icon: 'fa-group',
				children:[]
			}
		]
	},
	{
		name: 'Usuário',
		path: null,
		icon: 'fa-user-md',
		children: [
			{
				name: 'Profile',
				path: '/profile',
				icon: 'fa-user-md',
				children:[]
			},
			{
				name: 'Registar novo usuário',
				path: '/user/register',
				icon: 'fa-user-plus',
				children:[]
			},
			{
				name: 'Logout',
				path: '/teste',
				icon: 'fa-circle-o',
				children:[],
			}
		]
	}

]



