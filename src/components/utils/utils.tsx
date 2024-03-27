
  export function getAvatar(username: string) {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const index = Math.abs(hash) % colors.length;
  
    const initial = username ? username[0].toUpperCase() : '';
    const color = colors[index];
  
    return { initial, color };
  }