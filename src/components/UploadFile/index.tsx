import { Box } from "@chakra-ui/react";
import Dropzone from "react-dropzone";
import { DropContainer, UploadMessage } from './styles';

const UploadFile = ({file, setFile}) => {

    const handleUpload = (arquivoRecebido) => {
        console.log(arquivoRecebido);
        setFile(arquivoRecebido)
        // files.map((file) => {
        //   uploadedFiles.push(file);
        //   mostrarImagens.push({
        //     tipoImagem: 2,
        //     imagemPrincipal: 0,
        //     urlImagem: URL.createObjectURL(file),
        //   })
        // });
    };

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return (
                <UploadMessage>
                    Arraste o arquivo aqui, ou clique para selecionar{" "}
                </UploadMessage>
            );
        }
        if (isDragReject) {
            return <UploadMessage type="error">Arquivo Não suportado</UploadMessage>;
        }
        return <UploadMessage type="sucess">Solte os arquivos aqui</UploadMessage>;
    };

    return (
            <Dropzone accept="pdf" onDropAccepted={handleUpload}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive}
                        isDragReject={isDragReject}
                    >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
    );
}

export default UploadFile;