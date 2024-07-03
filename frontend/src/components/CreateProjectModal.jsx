// frontend/src/components/CreateProjectModal.jsx

import React, { useState } from 'react';
import {
    ModalContainer,
    ModalContent,
    ModalHeader,
    ModalTitle,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    ModalInput,
    ModalButton
} from './CreateProjectModal.styles';
import closeIcon from '../assets/close.svg';

const CreateProjectModal = ({ onClose, onCreate }) => {
    const [projectName, setProjectName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(projectName);
        setProjectName('');
    };

    return (
        <ModalContainer>
            <ModalContent>
                <ModalHeader>
                    <ModalTitle>Create Project</ModalTitle>
                    <ModalCloseButton onClick={onClose}>
                        <img src={closeIcon} alt="Close" />
                    </ModalCloseButton>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <ModalInput
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Project Name"
                            required
                        />
                        <ModalFooter>
                            <ModalButton type="submit">Create Project</ModalButton>
                        </ModalFooter>
                    </form>
                </ModalBody>
            </ModalContent>
        </ModalContainer>
    );
};

export default CreateProjectModal;
