import React, { Component } from "react";
const ModaloContext = React.createContext();

class ModaloProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      signupModalOpen: false
    };
  }

  openModal = () => {
    this.setState({
      modalOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  };

  openSignupModal = () => {
    this.setState({
      signupModalOpen: true
    });
  };

  closeSignupModal = () => {
    this.setState({
      signupModalOpen: false
    });
  };

  render() {
    return (
      <ModaloContext.Provider
        value={{
          ...this.state,
          openModal: this.openModal,
          closeModal: this.closeModal,
          openSignupModal: this.openSignupModal,
          closeSignupModal: this.closeSignupModal,
          ModaloContext
        }}
      >
        {this.props.children}
      </ModaloContext.Provider>
    );
  }
}

export const ModalConsumer = ModaloContext.Consumer;
export const ModalProvider = ModaloProvider;
