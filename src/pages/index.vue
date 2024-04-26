<template>
  <v-row>
    <v-col span="12">
      <span>Web Auth Demo</span>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <pre
        class="theme-atom-one-dark shadow-3xl text-sm relative overflow-hidden max-w-full tab-size h-full rounded-2"
      ><code class="hljs language-json text-xs" v-html="highlightedCode"></code></pre>
    </v-col>
  </v-row>
  <v-row>
    <v-col span="5">
      <v-btn @click="createPasskey">Create Passkey</v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import hljs from 'highlight.js/lib/core';
  import json from 'highlight.js/lib/languages/json';
  import 'highlight.js/styles/atom-one-dark.css';

  import { bufferToBase64URLString, startRegistration } from '@simplewebauthn/browser';

  const challenge = window.crypto.getRandomValues(new Uint8Array(32));
  const options: any = {
    rp: {
      name: 'Web Auth Demo',
      id: import.meta.env.VITE_APP_RP_ID,
    },
    user: {
      id: '1231332123',
      name: 'Ice',
      displayName: 'Ice-Alcove',
    },
    challenge: bufferToBase64URLString(challenge),
    pubKeyCredParams: [
      // for chrome
      { type: 'public-key', alg: -7 },
      { type: 'public-key', alg: -257 },
    ],
    authenticatorSelection: {
      userVerification: 'required',
      authenticatorAttachment: 'cross-platform',
    },
    attestation: 'direct',
  };

  hljs.registerLanguage('json', json);
  const highlightedCode = hljs.highlight(JSON.stringify(options, null, 2), {
    language: 'json',
  }).value;

  const createPasskey = async () => {
    const credential = await startRegistration(options);
    console.log(credential);
  };
</script>

<route lang="yaml">
meta:
  layout: default
</route>

