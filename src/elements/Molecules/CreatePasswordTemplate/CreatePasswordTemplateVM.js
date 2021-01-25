import { action, observable, decorate, computed } from 'mobx';

class CreatePasswordTemplateVM {
  constructor(props) {
    this.props = props;
    this.hasChar = false;
    this.hasDigit = false;
    this.hasSymbol = false;
    this.hasSix = false;
    this.passwordApproved = false;
    this.firstPassword = '';
    this.showPassword = false;

    this.checkValid = this.checkValid.bind(this);
    this.checkMatch = this.checkMatch.bind(this);
    this.handleFirstPasswordChange = this.handleFirstPasswordChange.bind(this);
    this.handleConfirmationPasswordChange = this.handleConfirmationPasswordChange.bind(this);
    this.updateCallback = this.updateCallback.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
  }

  handleFirstPasswordChange(event) {
    this.checkValid(event.target.value);
    this.updateCallback(null);
  }
  handleConfirmationPasswordChange(event) {
    this.checkMatch(event.target.value);
  }

  handleClickShowPassword() {
    this.showPassword = !this.showPassword;
  }

  checkValid(pass) {
    const hasChar = /[a-zA-Z]/.test(pass);
    const hasDigit = /[0-9]/.test(pass);
    const hasSymbol = /[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(pass);
    const hasSix = pass.length > 5;

    this.hasChar = hasChar;
    this.hasDigit = hasDigit;
    this.hasSymbol = hasSymbol;
    this.hasSix = hasSix;
    this.passwordApproved = hasChar && hasDigit && hasSymbol && hasSix;

    this.firstPassword = pass;
    /// if valid, but still not matched
    this.updateCallback(pass);
  }
  checkMatch(pass) {
    this.passwordMatched = pass == this.firstPassword;
    this.updateCallback(pass);
  }

  /// triggered on each change
  updateCallback(pass) {
    if (this.props.onPasswordUpdated) {
      if (this.passwordApproved && this.passwordMatched) {
        this.props.onPasswordUpdated(pass);
      } else {
        /// if password approved but not matched => false
        /// if password is not approved => null
        this.props.onPasswordUpdated(this.passwordApproved ? false : null);
      }
    }
  }
}

decorate(CreatePasswordTemplateVM, {
  hasChar: observable,
  hasDigit: observable,
  hasSymbol: observable,
  hasSix: observable,
  passwordApproved: observable,
  showPassword: observable,
});

export default CreatePasswordTemplateVM;
