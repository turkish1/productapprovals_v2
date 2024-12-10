// src/composables/useFileSystem.js
export function useFileSystem() {
    const createFolder = async () => {
        try {
            const directoryHandle = await window.showDirectoryPicker();
            return directoryHandle;
        } catch (error) {
            console.error('Error accessing file system:', error);
            throw error;
        }
    };

    // Make the process number the name of directoryHandle

    const saveFile = async (directoryHandle, fileName, content) => {
        const fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
    };

    return {
        createFolder,
        saveFile
    };
}
