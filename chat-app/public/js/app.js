class GlobalSocket {
	static instance = null;

	static getInstance() {
		if (GlobalSocket.instance) return GlobalSocket.instance;
		GlobalSocket.instance = io();
		return GlobalSocket.instance;
	}
}

class App {
	socket = GlobalSocket.getInstance();

	submitBtn = null;
	messagesContainer = null;
	textInput = null;
	shareBtn = null;
	roomSection = null;
	
	messages = [];
	connectionInfo = null;

	constructor() {
		this.connectionInfo = this.parseUserFromURL();
		this.init();
	}

	init() {
		this.messagesContainer = document.querySelector('.chat-messages');
		this.textInput = document.querySelector('#user-message-input');
		this.roomSection = document.querySelector('.chat__sidebar');

		this.initializeIncrementBtn();
		this.initializeShareBtn();
		
		this.socket.emit(
			'join',
			this.connectionInfo,
			(
				(error) => {
					if (error) {
						alert(error);
						location.href = '/';
					}
					console.log(`User: ${this.connectionInfo.username} has joined the room: ${this.connectionInfo.room}`);
				}
			).bind(this), 
		);
		this.socket.on('message', this.onMessageReceived.bind(this));
		this.socket.on('locationMessage', this.onLocationMessageReceived.bind(this));
		this.socket.on('roomData', this.handleRoomDataUpdate.bind(this))
	}

	initializeIncrementBtn() {
		this.submitBtn = document.querySelector('#send');

		this.submitBtn.addEventListener('click', (e) => {
			e.preventDefault();
			this.submitBtn.setAttribute('disabled', 'disabled');

			const value = this.textInput.value;

			if (!value || !value?.length) {
				this.submitBtn.removeAttribute('disabled');
				return;
			};

			this.socket.emit(
				'sendMessage', 
				{ value, ...this.connectionInfo },
				() => {
					setTimeout(
						(() => {
							this.submitBtn.removeAttribute('disabled');
							this.textInput.value = '';
							this.textInput.focus();
						}).bind(this),
						300
					)
					console.log('The message was delivered!!!');
				}
			);
		});
	}

	initializeShareBtn() {
		this.shareBtn = document.querySelector('#share-location');

		if (!navigator?.geolocation) {
			return alert('Geolocation isn\'t available in your browser');
		}

		this.shareBtn.addEventListener('click', (e) => {
			e.preventDefault();

			this.shareBtn.setAttribute('disabled', 'disabled');

			navigator.geolocation.getCurrentPosition((position) => {
				const { coords } = position;
				this.socket.emit(
					'sendLocation',
					{
						long: coords?.longitude,
						lat: coords?.latitude,
						...this.connectionInfo,
					},
					() => {
						setTimeout(
							(() => {
								this.shareBtn.removeAttribute('disabled');
							}).bind(this),
							300
						)
						console.log('Location is shared');
					},
				);
			});
		});
	}

	onMessageReceived(message) {
		const title = this.getUserMessageTitle(message.username);
		this.messages.push(message);
		const messageEl = document.createElement('div');
		messageEl.classList.add('chat-messages__message');
		messageEl.insertAdjacentElement('beforeend', title);
		messageEl.insertAdjacentHTML('beforeend', `<div>${message.value}</div>`);
		this.messagesContainer.insertAdjacentElement('beforeend', messageEl);
		this.autoScroll(messageEl);
	}

	onLocationMessageReceived(data) {
		const title = this.getUserMessageTitle(data.username);
		this.messages.push(data);
		const messageEl = document.createElement('div');
		messageEl.classList.add('chat-messages__message');
		messageEl.insertAdjacentElement('beforeend', title);

		const link = document.createElement('a');
		link.href = data.value;
		link.textContent = 'Geolocation link';
		messageEl.appendChild(link);

		this.messagesContainer.insertAdjacentElement('beforeend', messageEl);
		this.autoScroll(messageEl);
	}

	parseUserFromURL() {
		const parsedObject = Qs.parse(location.search, { ignoreQueryPrefix: true });
		return parsedObject;
	}

	getUserMessageTitle(username) {
		const messageTime = new Date().toLocaleDateString(
			undefined,
			{ day: "2-digit", month: "short", year: "numeric" },
		);

		const container = document.createElement('div');
		container.classList.add('message-user-title');

		container.insertAdjacentHTML(
			'beforeend',
			`
				<b>${username}</b>
				<span>${messageTime}</span>
			`,
		);
		return container;
	}

	handleRoomDataUpdate({ room, users }) {
		const sectionTitle = `
			<h2 class="room-title">${room}</h2>
			<h3 class="list-title">Users</h3>
		`;
		const usersListEl = document.createElement('ul');
		usersListEl.classList.add('users');
		usersListEl.insertAdjacentHTML('beforeend', sectionTitle);
		users.forEach(user => {
			const userEl = document.createElement('li');
			userEl.textContent = user.username;
			usersListEl.appendChild(userEl);
		});
		
		this.roomSection.innerHTML = '';
		this.roomSection.appendChild(usersListEl);
	}

	autoScroll() {
		this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
	}
};

const app = new App()

