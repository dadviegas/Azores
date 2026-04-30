// Azores — comprehensive icon library (lucide-style line icons as inline SVG)
const Icon = ({ name, size = 16, className = "", style = {}, strokeWidth = 1.6 }) => {
  const paths = {
    // Navigation & UI
    home: "M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a1 1 0 01-1-1v-6h-4v6a1 1 0 01-1 1H5a2 2 0 01-2-2z",
    layers: "M12 2l9 5-9 5-9-5 9-5z|M3 12l9 5 9-5|M3 17l9 5 9-5",
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    dashboard: "M3 13h8V3H3zM13 21h8V11h-8zM3 21h8v-6H3zM13 9h8V3h-8z",
    layout: "M3 3h18v18H3z|M3 9h18|M9 21V9",
    sidebar: "M3 3h18v18H3z|M9 3v18",
    panelright: "M3 3h18v18H3z|M15 3v18",
    menu: "M3 6h18|M3 12h18|M3 18h18",
    menusm: "M4 6h16|M4 12h10|M4 18h16",
    list: "M8 6h13|M8 12h13|M8 18h13|M3 6h.01M3 12h.01M3 18h.01",
    columns: "M3 3h18v18H3z|M12 3v18",

    // Arrows & directions
    arrowup: "M12 19V5|M5 12l7-7 7 7",
    arrowdown: "M12 5v14|M19 12l-7 7-7-7",
    arrowleft: "M19 12H5|M12 19l-7-7 7-7",
    arrowright: "M5 12h14|M12 5l7 7-7 7",
    arrowupright: "M7 17L17 7|M7 7h10v10",
    chevup: "M18 15l-6-6-6 6",
    chevdown: "M6 9l6 6 6-6",
    chevleft: "M15 18l-6-6 6-6",
    chevright: "M9 6l6 6-6 6",
    chevsupdown: "M7 15l5 5 5-5|M7 9l5-5 5 5",
    cornerup: "M9 14l-4-4 4-4|M5 10h11a4 4 0 014 4v6",
    cornerdown: "M15 10l4 4-4 4|M19 14H8a4 4 0 01-4-4V4",
    redo: "M21 7v6h-6|M3 17a9 9 0 0115-6.7L21 13",
    undo: "M3 7v6h6|M21 17a9 9 0 00-15-6.7L3 13",
    refresh: "M23 4v6h-6|M1 20v-6h6|M3.5 9a9 9 0 0114.9-3.4L23 10|M20.5 15a9 9 0 01-14.9 3.4L1 14",
    rotate: "M3 12a9 9 0 0115-6.7L21 8|M21 3v5h-5|M21 12a9 9 0 01-15 6.7L3 16|M3 21v-5h5",

    // Plus / Minus / Math / Close
    plus: "M12 5v14|M5 12h14",
    minus: "M5 12h14",
    pluscircle: "M12 22a10 10 0 100-20 10 10 0 000 20z|M12 8v8|M8 12h8",
    minuscircle: "M12 22a10 10 0 100-20 10 10 0 000 20z|M8 12h8",
    x: "M18 6L6 18|M6 6l12 12",
    xcircle: "M12 22a10 10 0 100-20 10 10 0 000 20z|M15 9l-6 6|M9 9l6 6",
    divide: "M12 7a1 1 0 100-2 1 1 0 000 2z|M5 12h14|M12 19a1 1 0 100-2 1 1 0 000 2z",
    percent: "M19 5L5 19|M6.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z|M17.5 20a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    equals: "M5 9h14|M5 15h14",

    // Search / Filter / Sort
    search: "M11 19a8 8 0 100-16 8 8 0 000 16z|M21 21l-4.3-4.3",
    filter: "M22 3H2l8 9.5V19l4 2v-8.5z",
    sort: "M11 5h10|M11 9h7|M11 13h4|M3 17l3 3 3-3|M6 4v16",
    sortasc: "M3 6h13|M3 12h9|M3 18h5|M17 6v12l4-4|M17 18l-4-4",
    sortdesc: "M3 6h5|M3 12h9|M3 18h13|M17 18V6l4 4|M17 6l-4 4",

    // Edit & manipulate
    edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7|M18.5 2.5a2.1 2.1 0 013 3L12 15l-4 1 1-4z",
    pencil: "M12 20h9|M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z",
    pen: "M19 21l-7-4-7 4V5a2 2 0 012-2h10a2 2 0 012 2z",
    erase: "M20 20H7L3 16a3 3 0 010-4l8-8a3 3 0 014 0l5 5a3 3 0 010 4l-7 7|M22 20H10",
    copy: "M20 9h-9a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-9a2 2 0 00-2-2z|M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1",
    cut: "M6 9a3 3 0 100-6 3 3 0 000 6z|M6 21a3 3 0 100-6 3 3 0 000 6z|M20 4L8.1 15.9|M14.5 14.5L20 20|M9.9 8.1L20 4",
    paste: "M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2|M9 4h6v3H9z",
    trash: "M3 6h18|M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2|M10 11v6|M14 11v6",
    save: "M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z|M17 21v-8H7v8|M7 3v5h8",
    download: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4|M7 10l5 5 5-5|M12 15V3",
    upload: "M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4|M17 8l-5-5-5 5|M12 3v12",
    share: "M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8|M16 6l-4-4-4 4|M12 2v13",
    share2: "M18 8a3 3 0 100-6 3 3 0 000 6zM6 15a3 3 0 100-6 3 3 0 000 6zM18 22a3 3 0 100-6 3 3 0 000 6z|M8.6 13.5l6.9 4|M15.4 6.5l-6.9 4",
    forward: "M15 17l5-5-5-5|M4 18v-2a4 4 0 014-4h12",
    reply: "M9 17l-5-5 5-5|M20 18v-2a4 4 0 00-4-4H4",

    // Files & folders
    file: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6",
    filetext: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
    filecode: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6|M10 13l-2 2 2 2|M14 13l2 2-2 2",
    fileplus: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z|M14 2v6h6|M12 18v-6|M9 15h6",
    folder: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z",
    folderopen: "M6 14l1.5-2.9A2 2 0 019.2 10H21a1 1 0 011 1.2l-1.4 6A2 2 0 0118.6 19H4a2 2 0 01-2-2V5a2 2 0 012-2h3.9a2 2 0 011.7 1l.7 1H18a2 2 0 012 2v2",
    folderplus: "M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z|M12 11v6|M9 14h6",
    archive: "M21 8v13H3V8|M1 3h22v5H1z|M10 12h4",
    package: "M16.5 9.4l-9-5.2|M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z|M3.3 7L12 12l8.7-5|M12 22V12",
    box: "M21 16V8a2 2 0 00-1-1.7l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.7l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z|M3.3 7L12 12l8.7-5|M12 22V12",

    // Communication
    mail: "M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z|M22 6l-10 7L2 6",
    mailopen: "M21 10v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10|M22 10l-10 7L2 10|M2 10l10-8 10 8",
    inbox: "M22 12h-6l-2 3h-4l-2-3H2|M5.4 5.5L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.4-6.5A2 2 0 0016.7 4H7.3a2 2 0 00-1.9 1.5z",
    send: "M22 2L11 13|M22 2l-7 20-4-9-9-4z",
    message: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    messages: "M21 11.5a8.4 8.4 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.4 8.4 0 013.8-.9h.5a8.5 8.5 0 018 8z",
    chat: "M3 5a2 2 0 012-2h11a2 2 0 012 2v9a2 2 0 01-2 2H5l-3 3z|M21 9v8a2 2 0 01-2 2h-2",
    phone: "M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 1.9.6 2.8a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.5 2.8.6a2 2 0 011.7 2z",
    phoneoff: "M10.7 14a13.4 13.4 0 003.4 3.4|M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-3.5-.6|M5.3 5.3A2 2 0 014.1 2h3a2 2 0 012 1.7c.1 1 .3 1.9.6 2.8a2 2 0 01-.5 2.1L8 9.8|M23 1L1 23",
    bell: "M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9|M13.7 21a2 2 0 01-3.4 0",
    belloff: "M13.7 21a2 2 0 01-3.4 0|M18 8a6 6 0 00-9.3-5|M16 9a6 6 0 002 5h-9.7M3 21l18-18",
    rss: "M4 11a9 9 0 019 9|M4 4a16 16 0 0116 16|M5 19a1 1 0 100-2 1 1 0 000 2z",

    // User & people
    user: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2|M12 11a4 4 0 100-8 4 4 0 000 8z",
    users: "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2|M9 11a4 4 0 100-8 4 4 0 000 8z|M23 21v-2a4 4 0 00-3-3.9|M16 3.1a4 4 0 010 7.8",
    userplus: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2|M8.5 11a4 4 0 100-8 4 4 0 000 8z|M20 8v6|M23 11h-6",
    usercheck: "M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2|M8.5 11a4 4 0 100-8 4 4 0 000 8z|M17 11l2 2 4-4",
    usercircle: "M12 22a10 10 0 100-20 10 10 0 000 20z|M16 18a4 4 0 10-8 0|M12 13a4 4 0 100-8 4 4 0 000 8z",
    crown: "M2 4l3 12h14l3-12-6 7-4-7-4 7z|M2 20h20",
    award: "M12 15a7 7 0 100-14 7 7 0 000 14z|M8.2 13.9L7 22l5-3 5 3-1.2-8.1",

    // Auth & security
    lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z|M7 11V7a5 5 0 0110 0v4",
    unlock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2z|M7 11V7a5 5 0 019.9-1",
    key: "M21 2l-9.6 9.6|M15.5 7.5l3 3M14 14a4 4 0 11-4-4|M14 14l-7 7-2-2 7-7",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    shieldcheck: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z|M9 12l2 2 4-4",
    shieldoff: "M19 13c0 4.4-7 9-7 9s-7-4.5-7-9V6l4-1.5M11.4 4.7l5.6-2.7 4 1.5v6c0 .9-.4 1.8-1 2.7|M2 2l20 20",
    fingerprint: "M2 12a10 10 0 0118-6|M5 19.5C5.5 18 6 15 6 12a6 6 0 0112 0v3a3 3 0 01-3 3|M22 12c0 4-1.5 7-3 9|M11 12v.5a3 3 0 005 2.4|M14.5 21.5a16 16 0 001.4-3",

    // System & settings
    settings: "M12 15a3 3 0 100-6 3 3 0 000 6z|M19.4 15a1.6 1.6 0 00.3 1.8l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.6 1.6 0 00-1.8-.3 1.6 1.6 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.6 1.6 0 00-1-1.5 1.6 1.6 0 00-1.8.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.6 1.6 0 00.3-1.8 1.6 1.6 0 00-1.5-1H3a2 2 0 110-4h.1a1.6 1.6 0 001.5-1 1.6 1.6 0 00-.3-1.8l-.1-.1a2 2 0 112.8-2.8l.1.1a1.6 1.6 0 001.8.3H9a1.6 1.6 0 001-1.5V3a2 2 0 114 0v.1a1.6 1.6 0 001 1.5 1.6 1.6 0 001.8-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.6 1.6 0 00-.3 1.8V9a1.6 1.6 0 001.5 1H21a2 2 0 110 4h-.1a1.6 1.6 0 00-1.5 1z",
    sliders: "M4 21v-7|M4 10V3|M12 21v-9|M12 8V3|M20 21v-5|M20 12V3|M1 14h6|M9 8h6|M17 16h6",
    toggleon: "M16 5H8a7 7 0 100 14h8a7 7 0 100-14z|M16 16a4 4 0 100-8 4 4 0 000 8z",
    toggleoff: "M16 5H8a7 7 0 100 14h8a7 7 0 100-14z|M8 16a4 4 0 100-8 4 4 0 000 8z",
    power: "M18.4 6.6a9 9 0 11-12.7 0|M12 2v10",
    poweroff: "M18.4 6.6a9 9 0 11-12.7 0|M12 2v10",
    plug: "M18 12V7|M6 12V7|M12 22v-5|M9 7h6V3H9z|M5 12h14v3a5 5 0 01-5 5h-4a5 5 0 01-5-5z",
    cpu: "M4 4h16v16H4z|M9 9h6v6H9z|M9 1v3|M15 1v3|M9 20v3|M15 20v3|M20 9h3|M20 14h3|M1 9h3|M1 14h3",
    server: "M4 4h16v6H4z|M4 14h16v6H4z|M6 7h.01|M6 17h.01",
    database: "M21 5c0 1.7-4 3-9 3s-9-1.3-9-3 4-3 9-3 9 1.3 9 3z|M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5|M3 12c0 1.7 4 3 9 3s9-1.3 9-3",
    wifi: "M5 13a10 10 0 0114 0|M9 17a5 5 0 016 0|M2 9a15 15 0 0120 0|M12 21h.01",
    wifioff: "M1 1l22 22|M16.7 16.7a5 5 0 00-7 .1M9 17a5 5 0 016 0M5 13a10 10 0 015.2-2.7|M2 9a15 15 0 015-2.9|M14.7 6.6A15 15 0 0122 9|M12 21h.01",
    bluetooth: "M6.5 6.5l11 11L12 23V1l5.5 5.5L6.5 17.5",
    battery: "M5 7h13a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2z|M22 11v2",
    batterycharging: "M5 18H3a2 2 0 01-2-2v-4a2 2 0 012-2h2|M11 6h8a2 2 0 012 2v8a2 2 0 01-2 2h-3|M11 6l-4 6h6l-4 6|M23 13v-2",
    volume: "M11 5L6 9H2v6h4l5 4z|M19 5a9 9 0 010 14|M16 8a5 5 0 010 8",
    volumeoff: "M11 5L6 9H2v6h4l5 4z|M23 9l-6 6|M17 9l6 6",

    // Time & calendar
    calendar: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z|M16 2v4|M8 2v4|M3 10h18",
    calplus: "M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2z|M16 2v4|M8 2v4|M3 10h18|M12 14v4|M10 16h4",
    clock: "M12 22a10 10 0 100-20 10 10 0 000 20z|M12 6v6l4 2",
    timer: "M10 2h4|M12 14l3-3|M12 22a8 8 0 100-16 8 8 0 000 16z",
    hourglass: "M5 22h14|M5 2h14|M17 22v-4.2a2 2 0 00-.6-1.4L12 12l-4.4 4.4a2 2 0 00-.6 1.4V22|M17 2v4.2a2 2 0 01-.6 1.4L12 12 7.6 7.6A2 2 0 017 6.2V2",
    history: "M3 12a9 9 0 1015-6.7L3 12V3|M12 7v5l3 3|M3 3v6h6",
    alarm: "M22 6l-3-3|M5 3L2 6|M12 13v3l2-1|M6 19a8 8 0 1112 0|M3.5 19l-1 2|M20.5 19l1 2",

    // Charts & data
    chart: "M3 3v18h18|M7 14l4-4 4 4 5-5",
    barchart: "M12 20V10|M18 20V4|M6 20v-4",
    barchart2: "M3 3v18h18|M7 12v6|M11 8v10|M15 4v14|M19 12v6",
    piechart: "M21.2 15.9A10 10 0 118.1 2.8|M22 12A10 10 0 0012 2v10z",
    activity: "M22 12h-4l-3 9L9 3l-3 9H2",
    trendingup: "M23 6l-9.5 9.5-5-5L1 18|M17 6h6v6",
    trendingdown: "M23 18l-9.5-9.5-5 5L1 6|M17 18h6v-6",
    target: "M12 22a10 10 0 100-20 10 10 0 000 20z|M12 18a6 6 0 100-12 6 6 0 000 12z|M12 14a2 2 0 100-4 2 2 0 000 4z",
    crosshair: "M12 22a10 10 0 100-20 10 10 0 000 20z|M22 12h-4|M6 12H2|M12 6V2|M12 22v-4",
    gauge: "M12 14l4-4|M3.3 7A10 10 0 0120 16M2 16h2M20 16h2",

    // Media
    image: "M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z|M8.5 11a1.5 1.5 0 100-3 1.5 1.5 0 000 3z|M21 15l-5-5L5 21",
    images: "M21 9l-2 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h9l2 2|M14 4h8v6h-8z|M17 6.5L21 4",
    camera: "M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z|M12 17a4 4 0 100-8 4 4 0 000 8z",
    video: "M23 7l-7 5 7 5z|M14 5H3a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2V7a2 2 0 00-2-2z",
    play: "M5 3l14 9-14 9z",
    pause: "M6 4h4v16H6zM14 4h4v16h-4z",
    stop: "M5 5h14v14H5z",
    skipnext: "M5 4l10 8-10 8z|M19 5v14",
    skipprev: "M19 20L9 12l10-8z|M5 19V5",
    fastforward: "M13 19l9-7-9-7z|M2 19l9-7-9-7z",
    rewind: "M11 19L2 12l9-7z|M22 19l-9-7 9-7z",
    repeat: "M17 1l4 4-4 4|M3 11V9a4 4 0 014-4h14|M7 23l-4-4 4-4|M21 13v2a4 4 0 01-4 4H3",
    shuffle: "M16 3h5v5|M4 20l17-17|M21 16v5h-5|M15 15l6 6|M4 4l5 5",
    mic: "M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z|M19 11a7 7 0 11-14 0|M12 18v4|M8 22h8",
    micoff: "M1 1l22 22|M9 9v2a3 3 0 005.1 2.1|M15 9.3V5a3 3 0 00-6-.7|M19 11a7 7 0 01-2 4.9|M12 18.4V22|M8 22h8",
    headphone: "M3 18a9 9 0 0118 0v3a2 2 0 01-2 2h-2v-7h4|M3 21v-3h4v7H5a2 2 0 01-2-2z",

    // Weather
    sun: "M12 17a5 5 0 100-10 5 5 0 000 10z|M12 1v2|M12 21v2|M4.2 4.2l1.4 1.4|M18.4 18.4l1.4 1.4|M1 12h2|M21 12h2|M4.2 19.8l1.4-1.4|M18.4 5.6l1.4-1.4",
    sunny: "M12 17a5 5 0 100-10 5 5 0 000 10z|M12 1v2|M12 21v2|M4.2 4.2l1.4 1.4|M18.4 18.4l1.4 1.4|M1 12h2|M21 12h2|M4.2 19.8l1.4-1.4|M18.4 5.6l1.4-1.4",
    moon: "M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z",
    cloud: "M18 10a6 6 0 00-11.4-2A4 4 0 007 18h11a4 4 0 000-8z",
    cloudsun: "M12 2v2|M5.6 5.6l1.5 1.5|M2 12h2|M17 12a5 5 0 10-9.9 1.1|M22 17a4 4 0 00-4-4 6 6 0 00-12 0 4 4 0 000 8h16a4 4 0 000-4z",
    rain: "M18 10a6 6 0 00-11.4-2A4 4 0 007 16h11a4 4 0 002-7|M16 14l-2 4|M12 14l-2 4|M8 14l-2 4",
    snow: "M2 12h20|M12 2v20|M20 16l-8-4-8 4|M4 8l8 4 8-4|M16 4l-4 4-4-4|M16 20l-4-4-4 4",
    wind: "M9.6 4.6A2 2 0 1111 8H2|M12.6 19.4A2 2 0 1014 16H2|M17.5 8a2.5 2.5 0 113.5 3.5H2",
    droplet: "M12 2.7l5.7 5.7a8 8 0 11-11.4 0z",
    thermometer: "M14 14.8V4a2 2 0 00-4 0v10.8a4 4 0 104 0z",

    // Social
    heart: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.7z",
    heartfilled: "M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 000-7.7z",
    star: "M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 18l-6.3 3.3 1.2-7-5-4.9 7-1z",
    starhalf: "M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 18l-6.3 3.3 1.2-7-5-4.9 7-1z|M12 2v16",
    thumbsup: "M14 9V5a3 3 0 00-3-3l-4 9v11h11.3a2 2 0 002-1.7l1.4-9A2 2 0 0019.7 9zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3",
    thumbsdown: "M10 15v4a3 3 0 003 3l4-9V2H5.7a2 2 0 00-2 1.7l-1.4 9A2 2 0 004.3 15zM17 2h2.7A2 2 0 0122 4v7a2 2 0 01-2 2h-3",
    bookmark: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z",
    flag: "M4 22V4|M4 4l16 5-9 4 9 5L4 22",
    smile: "M12 22a10 10 0 100-20 10 10 0 000 20z|M8 14s1.5 2 4 2 4-2 4-2|M9 9h.01|M15 9h.01",
    frown: "M12 22a10 10 0 100-20 10 10 0 000 20z|M16 16s-1.5-2-4-2-4 2-4 2|M9 9h.01|M15 9h.01",
    meh: "M12 22a10 10 0 100-20 10 10 0 000 20z|M8 15h8|M9 9h.01|M15 9h.01",

    // Status / alerts
    info: "M12 22a10 10 0 100-20 10 10 0 000 20z|M12 16v-4|M12 8h.01",
    warn: "M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z|M12 9v4|M12 17h.01",
    success: "M22 11.1V12a10 10 0 11-5.9-9.1|M22 4L12 14l-3-3",
    error: "M12 22a10 10 0 100-20 10 10 0 000 20z|M15 9l-6 6|M9 9l6 6",
    check: "M20 6L9 17l-5-5",
    checkcircle: "M22 11.1V12a10 10 0 11-5.9-9.1|M22 4L12 14l-3-3",
    help: "M12 22a10 10 0 100-20 10 10 0 000 20z|M9.1 9a3 3 0 015.8 1c0 2-3 3-3 3|M12 17h.01",
    ban: "M12 22a10 10 0 100-20 10 10 0 000 20z|M5 5l14 14",

    // Code & dev
    code: "M16 18l6-6-6-6|M8 6l-6 6 6 6",
    code2: "M18 16l4-4-4-4|M6 8l-4 4 4 4|M14.5 4l-5 16",
    terminal: "M4 17l6-6-6-6|M12 19h8",
    bracket: "M8 3H5a2 2 0 00-2 2v4M3 15v4a2 2 0 002 2h3|M16 3h3a2 2 0 012 2v4M21 15v4a2 2 0 01-2 2h-3",
    git: "M18 12c1.6 0 3-1.3 3-3s-1.4-3-3-3-3 1.3-3 3 1.4 3 3 3zM6 18c1.6 0 3-1.3 3-3s-1.4-3-3-3-3 1.3-3 3 1.4 3 3 3zM6 9V6c0-1 0-3 3-3h6|M6 12v6|M9 18h3a3 3 0 003-3v-3",
    branch: "M6 21V9a3 3 0 003-3h6a3 3 0 003 3v.5|M9 21V9|M6 6a2 2 0 100-4 2 2 0 000 4z|M6 22a2 2 0 100-4 2 2 0 000 4z|M18 12a2 2 0 100-4 2 2 0 000 4z",
    merge: "M8 6V4a2 2 0 100 4 2 2 0 000-4zM6 21a3 3 0 100-6 3 3 0 000 6zM18 18a3 3 0 100-6 3 3 0 000 6z|M8 8v8a4 4 0 004 4h2",
    pullrequest: "M18 21a3 3 0 100-6 3 3 0 000 6zM6 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6z|M6 6v12|M21 9v6a4 4 0 01-4 4",
    commit: "M3 12h4|M17 12h4|M12 17a5 5 0 100-10 5 5 0 000 10z",

    // Cloud / cloud computing
    cloudup: "M16 17l-4-4-4 4|M12 13v9|M20.4 18.4A5 5 0 0018 9h-1.3a8 8 0 10-13.7 6.7",
    clouddown: "M8 17l4 4 4-4|M12 12v9|M20.4 18.4A5 5 0 0018 9h-1.3a8 8 0 10-13.7 6.7",
    cloudoff: "M22.6 16a4 4 0 00-3.6-5h-1.3a8 8 0 00-9.3-5|M2 2l20 20|M9 13a4 4 0 005 5",
    cloudcheck: "M9 12l2 2 4-4|M18 9a5 5 0 015 5 5 5 0 01-5 5H6a4 4 0 01-2-7.5 5 5 0 0114-3z",

    // Tools / objects
    tool: "M14.7 6.3a4 4 0 00-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 005.6-5.6l-3 3-2.7-.3-.3-2.7z",
    wrench: "M14.7 6.3a4 4 0 00-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 005.6-5.6l-3 3-2.7-.3-.3-2.7z",
    paintbrush: "M19 11a4 4 0 00-4 4|M19 11a4 4 0 014-4|M15 15a3 3 0 11-6 0c0-1.6 1.4-2.4 1.4-4|M11 19a3 3 0 11-3-3",
    palette: "M12 2a10 10 0 100 20 4 4 0 000-8h-1a2 2 0 010-4h2a3 3 0 003-3v-1a8 8 0 00-4-4z|M7 10a1 1 0 100-2 1 1 0 000 2z|M11 6a1 1 0 100-2 1 1 0 000 2z|M16 8a1 1 0 100-2 1 1 0 000 2z",
    pipette: "M2 22l1-1h3l9-9|M3 21v-3l9-9|M15 6l3.4-3.4a2 2 0 113 3L18 9l-3-3z",
    type: "M4 7V5h16v2|M9 19h6|M12 5v14",
    fonts: "M4 19h6.5L12 15h0l1.5 4H20|M5 9h6V3|M19 21V3l-6 6",
    align: "M21 10H3|M21 6H3|M21 14H3|M21 18H3",
    aligncenter: "M21 10H7|M21 6H3|M21 14H3|M17 18H7",
    alignright: "M21 10H9|M21 6H3|M21 14H3|M21 18H7",
    indentr: "M3 8l4 4-4 4|M21 12H11|M21 6H3|M21 18H3",

    // Geo & travel
    map: "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z|M8 2v16|M16 6v16",
    mappin: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z|M12 13a3 3 0 100-6 3 3 0 000 6z",
    navigation: "M3 11l19-9-9 19-2-8z",
    compass: "M12 22a10 10 0 100-20 10 10 0 000 20z|M16.2 7.8l-2.1 6.3-6.3 2.1 2.1-6.3z",
    globe: "M12 22a10 10 0 100-20 10 10 0 000 20z|M2 12h20|M12 2a15 15 0 010 20|M12 2a15 15 0 000 20",
    plane: "M22 16.9c-1.3-.4-2.4-1.6-2.8-3l-3-9.5L13 2v8L2 14.5l1 2L13 14v6l-1.5 1V22l4-1 4 1v-1l-1.5-1v-6l9 1.5z",
    car: "M14 16H9m10 0h3v-3.2a4 4 0 00-.7-2L19 5H5l-2.3 5.8a4 4 0 00-.7 2V16h3M9 16a3 3 0 11-6 0 3 3 0 016 0zm12 0a3 3 0 11-6 0 3 3 0 016 0z",
    truck: "M1 3h15v13H1z|M16 8h4l3 3v5h-7V8|M5.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z|M18.5 21a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
    bike: "M5.5 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z|M18.5 17a3.5 3.5 0 100-7 3.5 3.5 0 000 7z|M15 6h2l3 7L13 13l-2-7H8",

    // Commerce
    shoppingcart: "M9 22a1 1 0 100-2 1 1 0 000 2z|M20 22a1 1 0 100-2 1 1 0 000 2z|M1 1h4l2.7 13.4a2 2 0 002 1.6h9.8a2 2 0 002-1.6L23 6H6",
    shoppingbag: "M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z|M3 6h18|M16 10a4 4 0 11-8 0",
    creditcard: "M22 5H2v14h20V5z|M2 10h20",
    wallet: "M21 12V7H5a2 2 0 010-4h14v4|M3 5v14a2 2 0 002 2h16v-5|M18 12a2 2 0 100 4h4v-4z",
    receipt: "M4 2h16v20l-3-2-3 2-3-2-3 2-3-2z|M8 6h8|M8 10h8|M8 14h5",
    coins: "M9 14a6 6 0 100-12 6 6 0 000 12z|M22 16a6 6 0 11-12 0 6 6 0 0112 0z|M9 8h.01|M16 16h.01",
    dollar: "M12 1v22|M17 5H9a4 4 0 100 8h6a4 4 0 110 8H6",
    gift: "M20 12v10H4V12|M2 7h20v5H2z|M12 22V7|M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z",
    discount: "M9 9h.01|M15 15h.01|M2 2l20 20|M3 9V4a1 1 0 011-1h5l11 11-6 6L2 9z",

    // Misc
    sparkle: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1",
    sparkles: "M9 12l-2-2-2 2 2 2zM19 9l-2-2-2 2 2 2zM15 17l2-2-2-2-2 2zM9 4L7 6l2 2 2-2z",
    magic: "M15 4l3 3-9 9-3-3z|M3 21l4-1 14-14-3-3L4 17z|M18 9l3-3-3-3-3 3",
    flame: "M8.5 14.5A2.5 2.5 0 0011 12c0-1.4-.5-2.2-1-3-1-2 0-4 0-4s7 5 7 11a5 5 0 11-10 0c0-1.5.4-2.7 1.5-3.5z",
    zap: "M13 2L3 14h9l-1 8 10-12h-9z",
    feather: "M20.2 13.8A6 6 0 0011.8 5.4L3 14.2V21h6.8z|M16 8L2 22|M17.5 15H9",
    leaf: "M11 20A7 7 0 014 13c0-2 1-3.9 3-5.5C9 6 11 5 13 5c3 0 6 1 8 4 0 11-9 11-10 11z|M2 22c2-2 5-7 11-9",
    heart2: "M19 14c1.5-1.5 3-3.3 3-5.5A5.5 5.5 0 0016.5 3a5.5 5.5 0 00-4.5 2.5A5.5 5.5 0 007.5 3 5.5 5.5 0 002 8.5c0 5.5 9 12.5 10 12.5s4.5-3.5 7-7z",
    eye: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z|M12 15a3 3 0 100-6 3 3 0 000 6z",
    eyeoff: "M17.9 17.9A10.4 10.4 0 0112 20c-7 0-11-8-11-8a18.4 18.4 0 015.1-5.9M9.9 4.2A10.4 10.4 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.2 3.2|M14.1 14.1a3 3 0 11-4.2-4.2|M1 1l22 22",
    drag: "M9 6h.01M9 12h.01M9 18h.01M15 6h.01M15 12h.01M15 18h.01",
    moreh: "M12 12h.01M19 12h.01M5 12h.01",
    morev: "M12 12h.01M12 5h.01M12 19h.01",
    tag: "M20 12l-8 8a2 2 0 01-3 0l-7-7a2 2 0 010-3l8-8h7a3 3 0 013 3z|M7 7h.01",
    tags: "M20 12l-8 8a2 2 0 01-3 0l-7-7a2 2 0 010-3l8-8h7a3 3 0 013 3z|M7 7h.01|M19 21l4-4-7-7",
    link: "M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7|M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7",
    link2: "M15 7h3a5 5 0 010 10h-3|M9 17H6a5 5 0 010-10h3|M8 12h8",
    unlink: "M18.8 13.2L15 17a5 5 0 01-7-7l1.6-1.6|M5 7L2 4l3-3|M21 17l3 3-3 3|M11 7l3-3 5 5-3 3",
    paperclip: "M21.4 11.05l-9 9a5 5 0 01-7-7l9-9a3.5 3.5 0 015 5l-9 9a2 2 0 01-3-3l8.5-8.5",
    bookopen: "M2 5a2 2 0 012-2h6v18H4a2 2 0 01-2-2zM22 5a2 2 0 00-2-2h-6v18h6a2 2 0 002-2z",
    book: "M4 19.5A2.5 2.5 0 016.5 17H20V2H6.5A2.5 2.5 0 004 4.5z",
    bookmarkplus: "M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z|M12 7v6|M9 10h6",
    quote: "M3 21c3 0 7-1 7-8V5c0-1.3-.7-2-2-2H4c-1.3 0-2 .7-2 2v6c0 1.3.7 2 2 2h2zM15 21c3 0 7-1 7-8V5c0-1.3-.7-2-2-2h-4c-1.3 0-2 .7-2 2v6c0 1.3.7 2 2 2h2z",
    bold: "M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6zM6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z",
    italic: "M19 4h-9|M14 20H5|M15 4L9 20",
    underline: "M6 4v6a6 6 0 0012 0V4|M4 21h16",
    strike: "M16 4H9a3 3 0 00-2.8 4|M14 12a4 4 0 010 8H6|M4 12h16",
    listord: "M10 6h11|M10 12h11|M10 18h11|M4 6h1v4|M4 10h2|M6 18H4c0-1 2-2 2-3s-1.5-1.5-2-1",
    listunord: "M8 6h13|M8 12h13|M8 18h13|M3 6h.01M3 12h.01M3 18h.01",
    quoteblock: "M21 8c0-1-1-2-2-2H5c-1 0-2 1-2 2v8c0 1 1 2 2 2h14c1 0 2-1 2-2z|M9 11h6|M9 15h4",

    // Resize / fullscreen
    minimize: "M8 3v3a2 2 0 01-2 2H3M21 8h-3a2 2 0 01-2-2V3M3 16h3a2 2 0 012 2v3M16 21v-3a2 2 0 012-2h3",
    expand: "M15 3h6v6|M9 21H3v-6|M21 3l-7 7|M3 21l7-7",
    maximize: "M3 3h7v7H3z|M14 14h7v7h-7z",
    move: "M5 9l-3 3 3 3|M9 5l3-3 3 3|M15 19l-3 3-3-3|M19 9l3 3-3 3|M2 12h20|M12 2v20",
    cross: "M22 12h-4M6 12H2M12 6V2M12 22v-4",
  };
  const d = paths[name] || paths.help;
  const parts = d.split("|");
  return (
    <svg
      width={size} height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {parts.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
};

// Expose registry for icon gallery
const ICON_NAMES = [
  // Navigation & UI
  "home","layers","grid","dashboard","layout","sidebar","panelright","menu","menusm","list","columns",
  // Arrows
  "arrowup","arrowdown","arrowleft","arrowright","arrowupright","chevup","chevdown","chevleft","chevright","chevsupdown","cornerup","cornerdown","redo","undo","refresh","rotate",
  // Plus/Minus/Math
  "plus","minus","pluscircle","minuscircle","x","xcircle","divide","percent","equals",
  // Search/Filter/Sort
  "search","filter","sort","sortasc","sortdesc",
  // Edit
  "edit","pencil","pen","erase","copy","cut","paste","trash","save","download","upload","share","share2","forward","reply",
  // Files
  "file","filetext","filecode","fileplus","folder","folderopen","folderplus","archive","package","box",
  // Communication
  "mail","mailopen","inbox","send","message","messages","chat","phone","phoneoff","bell","belloff","rss",
  // Users
  "user","users","userplus","usercheck","usercircle","crown","award",
  // Auth
  "lock","unlock","key","shield","shieldcheck","shieldoff","fingerprint",
  // System
  "settings","sliders","toggleon","toggleoff","power","plug","cpu","server","database","wifi","wifioff","bluetooth","battery","batterycharging","volume","volumeoff",
  // Time
  "calendar","calplus","clock","timer","hourglass","history","alarm",
  // Charts
  "chart","barchart","barchart2","piechart","activity","trendingup","trendingdown","target","crosshair","gauge",
  // Media
  "image","images","camera","video","play","pause","stop","skipnext","skipprev","fastforward","rewind","repeat","shuffle","mic","micoff","headphone",
  // Weather
  "sun","moon","cloud","cloudsun","rain","snow","wind","droplet","thermometer",
  // Social
  "heart","star","starhalf","thumbsup","thumbsdown","bookmark","flag","smile","frown","meh",
  // Status
  "info","warn","success","error","check","checkcircle","help","ban",
  // Code
  "code","code2","terminal","bracket","git","branch","merge","pullrequest","commit",
  // Cloud
  "cloudup","clouddown","cloudoff","cloudcheck",
  // Tools
  "tool","wrench","paintbrush","palette","pipette","type","fonts","align","aligncenter","alignright","indentr",
  // Geo
  "map","mappin","navigation","compass","globe","plane","car","truck","bike",
  // Commerce
  "shoppingcart","shoppingbag","creditcard","wallet","receipt","coins","dollar","gift","discount",
  // Misc
  "sparkle","sparkles","magic","flame","zap","feather","leaf","eye","eyeoff","drag","moreh","morev","tag","tags","link","link2","unlink","paperclip","bookopen","book","bookmarkplus","quote","bold","italic","underline","strike","listord","listunord","quoteblock",
  // Resize
  "minimize","expand","maximize","move","cross",
];

window.Icon = Icon;
window.ICON_NAMES = ICON_NAMES;
