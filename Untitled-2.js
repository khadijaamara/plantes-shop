<script src="script.js"></script>
// Validation du formulaire d'inscription
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriptionForm');
    const confirmationMessage = document.getElementById('confirmation-message');
    const retourAccueil = document.getElementById('retour-accueil');
    
    // Fonction pour afficher les erreurs
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = message;
        document.getElementById(inputId).style.borderColor = '#f44336';
    }
    
    // Fonction pour effacer les erreurs
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = '';
        document.getElementById(inputId).style.borderColor = '#e0e0e0';
    }
    
    // Validation de l'email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Validation du téléphone (format français)
    function validatePhone(phone) {
        if (!phone) return true; // Optionnel
        const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
        return re.test(phone);
    }
    
    // Validation du mot de passe
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }
    
    // Événements de validation en temps réel
    document.getElementById('email').addEventListener('blur', function() {
        if (!validateEmail(this.value)) {
            showError('email', 'Veuillez entrer une adresse email valide');
        } else {
            clearError('email');
        }
    });
    
    document.getElementById('telephone').addEventListener('blur', function() {
        if (!validatePhone(this.value)) {
            showError('telephone', 'Veuillez entrer un numéro de téléphone valide');
        } else {
            clearError('telephone');
        }
    });
    
    document.getElementById('password').addEventListener('input', function() {
        if (!validatePassword(this.value)) {
            showError('password', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
        } else {
            clearError('password');
        }
    });
    
    document.getElementById('confirm-password').addEventListener('input', function() {
        const password = document.getElementById('password').value;
        if (this.value !== password) {
            showError('confirm-password', 'Les mots de passe ne correspondent pas');
        } else {
            clearError('confirm-password');
        }
    });
    
    // Validation à la soumission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validation des champs requis
        const requiredFields = ['nom', 'prenom', 'email', 'username', 'password', 'confirm-password'];
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value.trim()) {
                showError(field, 'Ce champ est obligatoire');
                isValid = false;
            } else {
                clearError(field);
            }
        });
        
        // Validation spécifique
        if (!validateEmail(document.getElementById('email').value)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        if (!validatePhone(document.getElementById('telephone').value)) {
            showError('telephone', 'Veuillez entrer un numéro de téléphone valide');
            isValid = false;
        }
        
        if (!validatePassword(document.getElementById('password').value)) {
            showError('password', 'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial');
            isValid = false;
        }
        
        if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {
            showError('confirm-password', 'Les mots de passe ne correspondent pas');
            isValid = false;
        }
        
        if (!document.getElementById('conditions').checked) {
            showError('conditions', 'Vous devez accepter les conditions générales');
            isValid = false;
        }
        
        if (isValid) {
            // Afficher le message de confirmation
            form.style.display = 'none';
            confirmationMessage.style.display = 'block';
        }
    });
    
    // Bouton retour à l'accueil
    retourAccueil.addEventListener('click', function() {
        window.location.href = 'index.html';
    });
    
    // Réinitialisation du formulaire
    form.addEventListener('reset', function() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.textContent = '';
        });
        
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.style.borderColor = '#e0e0e0';
        });
    });
});
