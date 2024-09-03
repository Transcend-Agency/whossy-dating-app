import React from 'react';

type ChatInterfaceProps = {

};

const ChatInterface: React.FC<ChatInterfaceProps> = () => {

    return <div className='dashboard-layout__chat-interface'>
        <div className='dashboard-layout__chat-interface__drawer'>
            <div className="dashboard-layout__chat-interface__drawer__left">
                <img src="/assets/images/dashboard/chat-heart.svg" />
                <span className=''>Chat</span>
                <div className='dashboard-layout__chat-interface__drawer__left__unread-count'>20+</div>
            </div>
            <button className="dashboard-layout__chat-interface__drawer__open-button">
                <img src="/assets/images/dashboard/open-drawer.svg" />
            </button>
        </div>
    </div>
}
export default ChatInterface;