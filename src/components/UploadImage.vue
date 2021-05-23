<template>
  <div>
    <h1>Upload function coming soon</h1>
    <button @click="openUploadModal">Upload files</button>
  </div>
</template>

<script>
// import { cloudinary } from "../router/index";

export default {
  data() {},
  methods: {
    openUploadModal() {
      window.cloudinary
        .openUploadWidget(
          { cloud_name: "mai-boo", upload_preset: "tgq6vyat" },
          (error, result) => {
            if (!error && result && result.event === "success") {
              console.log("Done uploading..: ", result.info);
              
              // let signedURL = cloudinary
              //   .image(result.info.secure_url, {
              //     type: "fetch",
              //     sign_url: true,
              //   })
              //   .src
              //   ;
              // // this.imageUrl = signedURL;
              // console.log("Signed URL: ", signedURL);
              // console.log("Signed URL: ", signedURL.src);
            }
          }
        )
        .open();
    },
  },
};
</script>

<style lang="scss" scoped></style>
