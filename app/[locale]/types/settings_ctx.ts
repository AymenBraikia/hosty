export default interface Settings_UserData {
	first_name: string;
	last_name: string;
	email: string;
	verified_email: boolean;
	tfa_enabled: boolean;
	notifications: {
		billing: boolean;
		maintenance: boolean;
		marketing: boolean;
	};
}
