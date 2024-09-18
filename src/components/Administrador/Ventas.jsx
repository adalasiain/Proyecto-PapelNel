import React, { useState } from 'react';
import Modal from 'react-modal';

//Modal 
Modal.setAppElement('#root');

const Ventas = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalFecha, setModalFecha] = useState(""); // Estado para la fecha del modal
    const [modalCantidad, setModalCantidad] = useState(0); // Estado para la cantidad del modal

    const openModal = (fecha, cantidad) => {
        setModalFecha(fecha); // Establecer la fecha del modal
        setModalCantidad(cantidad); // Establecer la cantidad del modal
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    // Variables
    const var1f = "18-05-2024";
    const var2f = "19-05-2024";
    const var3p = 300;
    const var4p = 500;

    // Estilos en línea
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: '40%',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: 'white',
            padding: '20px',
            borderRadius: '10px',
            outline: 'none'
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: 1000
        }
    };

    return (
        <div className="con_ventas">
            <h1 className="mt-8 mb-4 text-4xl font-bold text-center">Ventas</h1>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-collapse bg-white shadow-lg rounded-lg">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 border-b border-gray-300 dark:border-gray-700">
                                Fecha
                            </th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-300 dark:border-gray-700">
                                Corte
                            </th>
                            <th scope="col" className="px-6 py-3 border-b border-gray-300 dark:border-gray-700">
                                Ver
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {var1f}
                            </td>
                            <td className="px-6 py-4">
                                {var3p}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => openModal(var1f, var3p)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Abrir Modal</button>
                            </td>
                        </tr>
                        <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {var2f}
                            </td>
                            <td className="px-6 py-4">
                                {var4p}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => openModal(var2f, var4p)} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Abrir Modal</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Ejemplo de Modal"
                style={customStyles}
            >
                <div className="p-6 bg-white rounded-lg shadow-lg border border-gray-300">
                    <button onClick={closeModal} className="float-right text-xl font-bold">&times;</button>
                    <h2 className="text-2xl font-bold text-center mb-4">Venta</h2>
                    <div className="mb-4">
                        <span className="font-bold">Fecha: </span>{modalFecha}
                    </div>
                    <div className="mb-4">
                        <span className="font-bold">Corte: </span>${modalCantidad}
                    </div>
                    <div>
                        <ul className="list-none">
                            <li className="flex justify-between"><span>Lapicero</span> <span>$20</span></li>
                            <li className="flex justify-between"><span>Goma</span> <span>$49</span></li>
                            <li className="flex justify-between"><span>Copias</span> <span>$2</span></li>
                            <li className="flex justify-between"><span>Resistol</span> <span>$21</span></li>
                            <li className="flex justify-between"><span>Recarga</span> <span>$100</span></li>
                            <li className="flex justify-between"><span>Plumón</span> <span>$10</span></li>
                        </ul>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Ventas;
