<template>
  <div>
    <h1>Upload function coming soon</h1>
    <button @click="openUploadModal">Upload files</button>
  </div>
</template>

<script
>
export default {
  methods: {
    openUploadModal() {
      window.cloudinary.openUploadWidget(
        { cloud_name: 'mai-boo',
          upload_preset: 'tgq6vyat'
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log('Done uploading..: ', result.info);          }
        }).open();
    }
  }
};
</script>

<style lang="scss" scoped></style>
