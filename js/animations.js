document.addEventListener('DOMContentLoaded', function() {
    // Initialisation de AOS avec les paramètres optimisés
    AOS.init({
        // Les animations se déclenchent quand l'élément est visible à 10% dans le viewport
        offset: 10,
        
        // Délai avant le début de l'animation
        delay: 0,
        
        // Durée de l'animation
        duration: 800,
        
        // L'animation se déclenche une seule fois
        once: false,
        
        // L'animation se déclenche à chaque fois que l'élément entre dans le viewport
        mirror: false,
        
        // Activer les animations sur mobile
        disable: false,
        
        // Déclencher les animations même si la page est chargée au milieu
        startEvent: 'DOMContentLoaded'
    });
});
