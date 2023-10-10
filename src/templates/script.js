// Helper function to get element by ID
const el = id => document.getElementById(id);

// Helper function to add/remove/toggle class of an element
const cls = (id, action, className) => el(id).classList[action](className);

// Toggle function to switch classes on several elements
function toggle() {
    // Iterates over each element id and toggles the respective class
    ['slider', 'biography-str', 'resume-str', 'biography', 'resume'].forEach(id => 
        cls(id, 'toggle', id.includes('str') ? 'bold' : (id === 'slider' ? 'update' : 'hide'))
    );
}

// Functions to set classes for biography and resume view
function biography() {
    setClasses(true);  // Passes true to indicate it's the biography view
}
function resume() {
    setClasses(false);  // Passes false to indicate it's the resume view
}

// Function to handle common logic for setting classes
// Adds or removes class on slider, resume-str or biograph-str based on isBio
function setClasses(isBio) {
    cls('slider', isBio ? 'add' : 'remove', 'update');
    cls('biography-str', isBio ? 'add' : 'remove', 'bold');
    cls('resume-str', isBio ? 'remove' : 'add', 'bold');
    cls('biography', isBio ? 'remove' : 'add', 'hide');
    cls('resume', isBio ? 'add' : 'remove', 'hide');
}
