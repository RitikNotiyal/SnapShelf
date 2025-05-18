const generateAvatar = (name) => { 
    const bgColors = ['0D6EFD', '6610F2', '6F42C1', 'D63384', 'DC3545', 'FD7E14', '20C997', '0DCAF0', '198754'];
    const randomIndex = Math.floor(Math.random() * bgColors.length)
    const background = bgColors[randomIndex];
    const formattedName = name.trim().split(" ").join("+");
    const url = `https://ui-avatars.com/api/?name=${formattedName}&background=${background}&color=fff`;
    return url;
}

module.exports = generateAvatar;

// This function generates a random avatar URL using the ui-avatars API.