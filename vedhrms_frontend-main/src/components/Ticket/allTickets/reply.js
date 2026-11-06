"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import { Person, SupportAgent, Send } from "@mui/icons-material";

// Style injection for animations
const injectReplyStyles = () => {
  if (document.getElementById("rt-styles")) return;
  const s = document.createElement("style");
  s.id = "rt-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── animations ── */
    @keyframes rt-fade-in    { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
    @keyframes rt-slide-left { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
    @keyframes rt-slide-right{ from{opacity:0;transform:translateX(12px)} to{opacity:1;transform:translateX(0)} }
    @keyframes rt-pulse-send { 0%{transform:scale(1)} 50%{transform:scale(1.05)} 100%{transform:scale(1)} }

    /* ── root container ── */
    .rt-root {
      font-family: 'Plus Jakarta Sans', sans-serif;
      color: #1e293b;
    }

    /* ── ticket header ── */
    .rt-ticket-header {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      animation: rt-fade-in .5s cubic-bezier(.22,1,.36,1);
      box-shadow: 0 1px 2px rgba(16,24,40,.02);
    }

    .rt-ticket-code {
      font-size: 0.9rem;
      font-weight: 700;
      color: #4f46e5;
      letter-spacing: .05em;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .rt-ticket-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 12px;
      letter-spacing: -.02em;
    }

    .rt-ticket-meta {
      font-size: 0.85rem;
      color: #64748b;
      font-weight: 500;
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
    }

    .rt-ticket-meta span {
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    /* ── conversation thread ── */
    .rt-conversation {
      max-height: 450px;
      overflow-y: auto;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      background: #ffffff;
      box-shadow: inset 0 1px 2px rgba(16,24,40,.02);
    }

    .rt-conversation::-webkit-scrollbar {
      width: 6px;
    }

    .rt-conversation::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 10px;
    }

    .rt-conversation::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 10px;
    }

    .rt-conversation::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }

    .rt-thread-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 16px;
      letter-spacing: -.01em;
    }

    /* ── message bubble ── */
    .rt-message-container {
      display: flex;
      gap: 12px;
      margin-bottom: 18px;
      animation: rt-fade-in .45s cubic-bezier(.22,1,.36,1) both;
    }

    .rt-message-container.rt-user {
      flex-direction: row;
      justify-content: flex-start;
    }

    .rt-message-container.rt-support {
      flex-direction: row-reverse;
      justify-content: flex-start;
    }

    .rt-avatar {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .rt-avatar.rt-user-avatar {
      background: #eef2ff;
      color: #4f46e5;
    }

    .rt-avatar.rt-support-avatar {
      background: #f0fdf4;
      color: #16a34a;
    }

    .rt-message-bubble {
      flex: 1;
      max-width: 85%;
      padding: 14px 16px;
      border-radius: 12px;
      border: 1px solid transparent;
      animation: rt-fade-in .45s cubic-bezier(.22,1,.36,1) both;
    }

    .rt-message-container.rt-user .rt-message-bubble {
      background: #f8fafc;
      border-color: #e2e8f0;
    }

    .rt-message-container.rt-support .rt-message-bubble {
      background: #f0fdf4;
      border-color: #dcfce7;
    }

    .rt-message-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      gap: 12px;
    }

    .rt-message-author {
      font-size: 0.85rem;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: -.01em;
    }

    .rt-message-time {
      font-size: 0.75rem;
      color: #94a3b8;
      font-weight: 500;
    }

    .rt-message-text {
      font-size: 0.875rem;
      color: #475569;
      line-height: 1.5;
      word-break: break-word;
    }

    .rt-empty-state {
      text-align: center;
      padding: 32px 20px;
      color: #94a3b8;
    }

    .rt-empty-icon {
      font-size: 2.5rem;
      margin-bottom: 12px;
      opacity: 0.4;
    }

    .rt-empty-text {
      font-size: 0.9rem;
      font-weight: 500;
    }

    /* ── reply input section ── */
    .rt-reply-section {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      animation: rt-fade-in .55s .1s cubic-bezier(.22,1,.36,1) both;
      box-shadow: 0 1px 2px rgba(16,24,40,.02);
    }

    .rt-section-title {
      font-size: 1rem;
      font-weight: 700;
      color: #1e293b;
      margin-bottom: 16px;
      letter-spacing: -.01em;
    }

    /* ── textarea ── */
    .rt-textarea {
      font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .rt-textarea .MuiOutlinedInput-root {
      background: #ffffff;
      border-radius: 10px;
      font-size: 0.875rem;
      transition: border-color .2s, box-shadow .2s;
    }

    .rt-textarea .MuiOutlinedInput-root fieldset {
      border-color: #e2e8f0;
    }

    .rt-textarea .MuiOutlinedInput-root:hover fieldset {
      border-color: #cbd5e1;
    }

    .rt-textarea .MuiOutlinedInput-root.Mui-focused fieldset {
      border-color: #818cf8;
      box-shadow: 0 0 0 4px rgba(99,102,241,.10);
    }

    /* ── button group ── */
    .rt-button-group {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .rt-btn {
      padding: 9px 16px;
      border: none;
      border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: .01em;
      cursor: pointer;
      transition: all .2s ease;
      text-transform: uppercase;
    }

    .rt-btn-type-selector {
      display: flex;
      gap: 8px;
      flex: 1;
    }

    .rt-btn-type {
      flex: 1;
      padding: 10px 14px;
      border: 1.5px solid #e2e8f0;
      background: #ffffff;
      color: #64748b;
      border-radius: 10px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;
      transition: all .2s ease;
    }

    .rt-btn-type:hover {
      border-color: #cbd5e1;
      background: #f8fafc;
    }

    .rt-btn-type.active {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #fff;
      border-color: #4f46e5;
      box-shadow: 0 4px 12px rgba(79,70,229,.25);
    }

    .rt-btn-secondary {
      background: #ffffff;
      color: #64748b;
      border: 1.5px solid #e2e8f0;
    }

    .rt-btn-secondary:hover {
      background: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-1px);
    }

    .rt-btn-primary {
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff;
      box-shadow: 0 4px 14px rgba(79,70,229,.25);
    }

    .rt-btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(79,70,229,.32);
      filter: brightness(1.04);
    }

    .rt-btn-primary:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .rt-btn-primary svg {
      font-size: 16px;
    }

    .rt-action-buttons {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    /* ── grid spacing ── */
    .rt-grid-row {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    @media (max-width: 600px) {
      .rt-message-bubble {
        max-width: 100%;
      }
      .rt-button-group {
        flex-direction: column;
      }
    }
  `;
  document.head.appendChild(s);
};

const ReplyTicket = ({ selectedTicket, onAddReply, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyType, setReplyType] = useState("user");

  useEffect(() => {
    injectReplyStyles();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (!selectedTicket) {
    return (
      <Box className="rt-root" sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
        <Typography>No ticket selected</Typography>
      </Box>
    );
  }

  const handleAddReply = () => {
    if (replyText.trim()) {
      onAddReply && onAddReply(replyText, replyType);
      setReplyText("");
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Box className="rt-root" sx={{ display: "flex", flexDirection: "column", gap: "1.2rem", padding: "0.5rem 0" }}>
      {/* Ticket Header */}
      <Box className="rt-ticket-header">
        <div className="rt-ticket-code">Ticket #{selectedTicket.code}</div>
        <div className="rt-ticket-title">{selectedTicket.title}</div>
        <div className="rt-ticket-meta">
          <span>👤 Created by: <strong>{selectedTicket.employee}</strong></span>
          <span>⚡ Priority: <strong>{selectedTicket.priority}</strong></span>
          <span>📊 Status: <strong>{selectedTicket.status}</strong></span>
        </div>
      </Box>

      {/* Conversation Thread */}
      <Box className="rt-conversation">
        <div className="rt-thread-title">Conversation</div>

        {/* Initial Ticket Description */}
        <Box className="rt-message-container rt-user" style={{ animationDelay: "50ms" }}>
          <Avatar className="rt-avatar rt-user-avatar">
            <Person sx={{ fontSize: 18 }} />
          </Avatar>
          <Box className="rt-message-bubble">
            <Box className="rt-message-header">
              <span className="rt-message-author">{selectedTicket.employee}</span>
              <span className="rt-message-time">{selectedTicket.createdDate}</span>
            </Box>
            <Typography className="rt-message-text">{selectedTicket.description}</Typography>
          </Box>
        </Box>

        {/* Replies */}
        {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
          selectedTicket.replies.map((reply, index) => (
            <Box
              key={index}
              className={`rt-message-container ${reply.type === "support" ? "rt-support" : "rt-user"}`}
              style={{ animationDelay: `${100 + index * 60}ms` }}
            >
              <Avatar className={`rt-avatar ${reply.type === "support" ? "rt-support-avatar" : "rt-user-avatar"}`}>
                {reply.type === "support" ? (
                  <SupportAgent sx={{ fontSize: 18 }} />
                ) : (
                  <Person sx={{ fontSize: 18 }} />
                )}
              </Avatar>
              <Box className="rt-message-bubble">
                <Box className="rt-message-header">
                  <span className="rt-message-author">{reply.author}</span>
                  <span className="rt-message-time">{formatTimestamp(reply.timestamp)}</span>
                </Box>
                <Typography className="rt-message-text">{reply.message}</Typography>
              </Box>
            </Box>
          ))
        ) : (
          <Box className="rt-empty-state">
            <div className="rt-empty-icon">💬</div>
            <div className="rt-empty-text">No replies yet. Start the conversation below.</div>
          </Box>
        )}
      </Box>

      {/* Add Reply Section */}
      <Box className="rt-reply-section">
        <div className="rt-section-title">Add Reply</div>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Reply Text Area */}
          <TextField
            fullWidth
            multiline
            rows={3}
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            variant="outlined"
            className="rt-textarea"
            sx={{
              "& .MuiOutlinedInput-input::placeholder": {
                color: "#cbd5e1",
                opacity: 1,
              },
            }}
          />

          {/* Type Selector */}
          <Box sx={{ display: "flex", gap: "12px" }}>
            <Box className="rt-btn-type-selector">
              <button
                className={`rt-btn-type ${replyType === "user" ? "active" : ""}`}
                onClick={() => setReplyType("user")}
              >
                👤 User Reply
              </button>
              <button
                className={`rt-btn-type ${replyType === "support" ? "active" : ""}`}
                onClick={() => setReplyType("support")}
              >
                ✓ Support Reply
              </button>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box className="rt-action-buttons">
            <button
              className="rt-btn rt-btn-secondary"
              onClick={() => setReplyText("")}
            >
              Clear
            </button>
            <button
              className="rt-btn rt-btn-primary"
              onClick={handleAddReply}
              disabled={!replyText.trim()}
            >
              <Send sx={{ fontSize: 15, marginRight: "6px" }} />
              Send Reply
            </button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ReplyTicket;
