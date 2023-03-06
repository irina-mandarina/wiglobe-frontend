<script setup>
  import { saveAs } from 'file-saver';
  const root = await navigator.storage.getDirectory();

  const handleFileUpload = async (event) => {
    const draftHandle = await root.getFileHandle("try.png", { create: true });
    console.log(root)
    console.log(event.target.files)

    const accessHandle = await draftHandle.createSyncAccessHandle();

    // Get size of the file.
    const fileSize = accessHandle.getSize();
    // Read file content to a buffer.
    const buffer = new DataView(new ArrayBuffer(fileSize));
    const readBuffer = accessHandle.read(buffer, { at: 0 });

    // Write the message to the end of the file.
    // const encoder = new TextEncoder();
    // const encodedMessage = encoder.encode(event.target.files[0]);
    const writeBuffer = accessHandle.write(event.target.files[0], { at: readBuffer });

    // Persist changes to disk.
    accessHandle.flush();

    // Always close FileSystemSyncAccessHandle if done.
    accessHandle.close();
  }

</script>

<template>
  <div>
    <input type="file" accept="image/*" @change="handleFileUpload"/>
  </div>
</template>
