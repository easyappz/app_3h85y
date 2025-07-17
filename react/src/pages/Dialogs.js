import React, { useState, useEffect } from 'react';
import { Box, Grid, Divider } from '@mui/material';
import DialogList from '../components/dialogs/DialogList';
import ChatWindow from '../components/dialogs/ChatWindow';
import axios from 'axios';

const Dialogs = () => {
  const [dialogs, setDialogs] = useState([]);
  const [selectedDialog, setSelectedDialog] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDialogs = async () => {
      try {
        const response = await axios.get('/api/dialogs');
        setDialogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dialogs:', error);
        setLoading(false);
      }
    };

    fetchDialogs();
  }, []);

  useEffect(() => {
    if (selectedDialog) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`/api/dialogs/${selectedDialog.id}/messages`);
          setMessages(response.data);
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      };

      fetchMessages();
    } else {
      setMessages([]);
    }
  }, [selectedDialog]);

  const handleSelectDialog = (dialog) => {
    setSelectedDialog(dialog);
  };

  const handleSendMessage = async (content) => {
    if (!selectedDialog || !content) return;

    try {
      const response = await axios.post(`/api/dialogs/${selectedDialog.id}/messages`, { content });
      setMessages((prev) => [...prev, response.data]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>Loading...</Box>;
  }

  return (
    <Box sx={{ height: 'calc(100vh - 64px)', overflow: 'hidden', backgroundColor: '#fff' }}>
      <Grid container sx={{ height: '100%' }}>
        <Grid item xs={4} sx={{ borderRight: '1px solid #e0e0e0', height: '100%', overflowY: 'auto' }}>
          <DialogList 
            dialogs={dialogs} 
            selectedDialog={selectedDialog} 
            onSelectDialog={handleSelectDialog} 
          />
        </Grid>
        <Grid item xs={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          {selectedDialog ? (
            <ChatWindow 
              messages={messages} 
              selectedDialog={selectedDialog} 
              onSendMessage={handleSendMessage} 
            />
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              Select a dialog to start chatting
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dialogs;
