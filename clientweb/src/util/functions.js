export default class Functions{
	
	static isEmailValid(email){
		return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
	}

	static addRequestHeader(request){
		request.setRequestHeader("Accept", 'application/json');
        request.setRequestHeader("Authorization", `Bearer ${localStorage.token}`);
	}

}