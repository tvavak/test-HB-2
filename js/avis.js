document.addEventListener('DOMContentLoaded', function() {
    // Vérification que EmailJS est chargé
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS n\'est pas chargé !');
        return;
    }

    // Get elements
    const avisForm = document.getElementById('avisForm');
    const ratingStars = document.querySelectorAll('.rating i');
    const ratingInput = document.getElementById('avisRating');
    const avisModal = document.getElementById('avisModal');
    const successToast = new bootstrap.Toast(document.getElementById('successToast'));
    const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
    const modal = new bootstrap.Modal(avisModal);

    // Vérification des éléments
    if (!avisForm || !ratingInput || !avisModal) {
        console.error('Éléments du formulaire manquants !');
        return;
    }

    // Handle star rating
    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            updateStars(rating, 'hover');
        });

        star.addEventListener('mouseout', function() {
            const currentRating = ratingInput.value;
            updateStars(currentRating, 'selected');
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            updateStars(rating, 'selected');
        });
    });

    // Update stars visual state
    function updateStars(rating, state) {
        ratingStars.forEach(star => {
            const starRating = star.dataset.rating;
            if (state === 'hover') {
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            } else if (state === 'selected') {
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            }
        });
    }

    // Function to generate stars HTML
    function generateStarsHTML(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    // Handle form submission
    avisForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        console.log('Formulaire soumis');

        const submitButton = this.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';

        try {
            const rating = parseInt(ratingInput.value);
            const templateParams = {
                from_name: document.getElementById('avisName').value,
                from_email: document.getElementById('avisEmail').value,
                rating: generateStarsHTML(rating),
                message: document.getElementById('avisComment').value,
                to_email: 'vavaktom@gmail.com',
                submit_date: new Date().toLocaleString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })
            };

            console.log('Paramètres du template:', templateParams);

            const response = await emailjs.send(
                'HB-plomberie',
                'HB-plomberie-template',
                templateParams
            );

            console.log('Email envoyé avec succès:', response);

            // Reset form
            this.reset();
            ratingInput.value = '0';
            updateStars(0, 'selected');

            // Close modal and show success message
            modal.hide();
            successToast.show();
        } catch (error) {
            console.error('Erreur lors de l\'envoi:', error);
            errorToast.show();
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Envoyer mon avis';
        }
    });
});
