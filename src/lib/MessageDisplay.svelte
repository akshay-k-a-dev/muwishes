<script lang="ts">
import type { GeneratedMessage } from './types';
import { messageService } from './services/firebase';

export let message: GeneratedMessage;
export let onNewMessage: () => void;

let sharing = false;
let error = '';
let shareUrl = '';

async function shareMessage() {
  if (sharing) return;
  
  try {
    sharing = true;
    error = '';
    const id = await messageService.save(message);
    shareUrl = `${window.location.origin}/share/${id}`;
    await navigator.clipboard.writeText(shareUrl);
    alert('Share link copied to clipboard!');
  } catch (err) {
    error = 'Failed to generate share link. Please try again.';
    console.error(err);
  } finally {
    sharing = false;
  }
}
</script>

<div class="message-display card">
  <div class="message-content">
    <h1>Holiday Wishes</h1>
    <p class="message">{message.content}</p>
    <p class="signature">From: {message.form.senderName}</p>
    <p class="recipient">To: {message.form.recipientName}</p>
  </div>
  
  <div class="button-group">
    <button class="share-btn" on:click={shareMessage} disabled={sharing}>
      {sharing ? 'Generating link...' : 'Share Message'}
    </button>
    
    <button class="new-btn" on:click={onNewMessage}>
      Create New Message
    </button>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}
  
  {#if shareUrl}
    <p class="share-url">Share URL: {shareUrl}</p>
  {/if}
</div>

<style>
.message-content {
  margin-bottom: 2rem;
}

.message {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: var(--christmas-white);
}

.signature, .recipient {
  color: var(--christmas-gold);
  font-style: italic;
  margin: 0.5rem 0;
}

.button-group {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 2rem;
}

.share-url {
  margin-top: 1rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  word-break: break-all;
}

.error {
  color: #ff6b6b;
  margin-top: 1rem;
  text-align: center;
}
</style>