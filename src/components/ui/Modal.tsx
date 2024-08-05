import { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
	children: ReactNode;
	onClose?: () => void;
	className?: string;
}

const Modal: React.FC<ModalProps> = ({ children, onClose, className = "" }) => {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				onClose && onClose();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [onClose]);
	return (
		<div
			className={`fixed inset-0 flex justify-center z-50 items-center transition-colors bg-black/20
      ${className}`}>
			<div ref={modalRef} className="mx-5 ">
				{children}
			</div>
		</div>
	);
};

export default Modal;