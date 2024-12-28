<script lang="ts">
import { onMount } from 'svelte';
import MessageForm from './lib/MessageForm.svelte';
import MessageDisplay from './lib/MessageDisplay.svelte';
import Snowfall from './lib/Snowfall.svelte';
import Fireworks from './lib/Fireworks.svelte';
import SharedMessage from './lib/SharedMessage.svelte';
import type { MessageForm as MessageFormType, GeneratedMessage } from './lib/types';
import { generateFestiveMessage } from './lib/services/gemini';
import { v4 as uuidv4 } from 'uuid';
import { currentRoute } from './lib/stores/route';

let loading = false;
let error: string | null = null;
let generatedMessage: GeneratedMessage | null = null;
let showFireworks = false;
let messageId: string | null = null;

$: {
  const path = $currentRoute;
  if (path.startsWith('/share/')) {
    messageId = path.split('/share/')[1];
  } else {
    messageId = null;
  }
}

async function handleSubmit(event: CustomEvent<MessageFormType>) {
  loading = true;
  error = null;
  
  try {
    const form = event.detail;
    const content = await generateFestiveMessage(
      form.senderName,
      form.recipientName,
      form.relationship
    );

    generatedMessage = {
      id: uuidv4(),
      content,
      form,
      createdAt: new Date().toISOString()
    };
    showFireworks = true;
  } catch (e) {
    error = 'Failed to generate message. Please try again.';
    console.error(e);
  } finally {
    loading = false;
  }
}

function resetMessage() {
  generatedMessage = null;
  showFireworks = false;
}
</script>

<main>
  {#if showFireworks}
    <Fireworks />
  {/if}
  <Snowfall />
  
  <div class="container">
    {#if messageId}
      <SharedMessage {messageId} />
    {:else}
      <h1>Festive Message Generator</h1>
      
      {#if !generatedMessage}
        <MessageForm on:submit={handleSubmit} />
      {:else}
        <MessageDisplay message={generatedMessage} onNewMessage={resetMessage} />
      {/if}

      {#if loading}
        <div class="loading">Generating your festive message...</div>
      {/if}

      {#if error}
        <div class="error">{error}</div>
      {/if}
    {/if}
  </div>
</main>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  z-index: 2;
}

.loading {
  text-align: center;
  color: var(--christmas-white);
  margin-top: 1rem;
}

.error {
  background-color: #ff6b6b;
  color: white;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  text-align: center;
}
</style>