"use client";
import { useEffect } from "react";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
	classes?: string;
}

export const GlobalModal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	children,
	classes,
}) => {
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.body.style.overflow = "hidden"; // Disable scroll
			document.addEventListener("keydown", handleEsc);
		} else {
			document.body.style.overflow = ""; // Reset scroll
		}

		return () => {
			document.body.style.overflow = ""; // Cleanup on unmount
			document.removeEventListener("keydown", handleEsc);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className={`fixed inset-0 z-50 flex justify-center items-center bg-[#00000069] cursor-default`}>
			<div
				className={`${classes} max-w-md sm:w-[470px] w-[375px]  overflow-hidden bg-white rounded-[10px] relative`}>
				{/* Close Button */}
				<div
					onClick={onClose}
					className="absolute xl:right-[20px] right-[10px]  w-[30px] h-[30px] bg-red-500 flex items-center justify-center hover:bg-red-600 rounded-full top-[15px] text-white font-bold cursor-pointer z-50">
					X
				</div>

				{/* Scrollable content */}
				<div className="">{children}</div>
			</div>
		</div>
	);
};
