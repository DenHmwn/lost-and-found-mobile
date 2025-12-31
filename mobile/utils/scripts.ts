export const formatToWIB = (dateString: string) => {
    if (!dateString) return "Baru saja";
    
    const date = new Date(dateString);
    
    // Format: 20 Des 2024, 14:30 WIB
    return new Intl.DateTimeFormat('id-ID', {
      timeZone: 'Asia/Jakarta',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date) + ' WIB';
  };