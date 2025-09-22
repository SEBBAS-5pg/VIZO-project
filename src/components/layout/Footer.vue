<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>🎨 Vizo Gallery</h3>
        <p>Tu destino para imágenes inspiradoras. © 2024</p>
      </div>

      <div class="footer-section">
        <h3>Enlaces rápidos</h3>
        <ul>
          <li><a href="#" @click.prevent="$emit('nav-to', 'home')">Inicio</a></li>
          <li><a href="#" @click.prevent="$emit('nav-to', 'favorites')">Favoritos</a></li>
          <li><a href="#" @click.prevent="$emit('nav-to', 'upload')">Subir imagen</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h3>Síguenos</h3>
        <div class="social-links">
          <a href="#" class="social-link" aria-label="GitHub">
            <font-awesome-icon :icon="['fab', 'github']" />
          </a>
          <a href="#" class="social-link" aria-label="Twitter">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </a>
          <a href="#" class="social-link" aria-label="Instagram">
            <font-awesome-icon :icon="['fab', 'instagram']" />
          </a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>
        <font-awesome-icon :icon="['fas', 'envelope']" />
        info@vizogallery.com
      </p>
      <p class="copyright">&copy; 2024 Vizo Gallery. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faGithub, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

library.add(faGithub,faTwitter, faInstagram, faEnvelope)

export default {
  name: 'AppFooter',
  //registrar el componente de font awesome para utilizarlo en la plantilla
  components: {
    FontAwesomeIcon
  },
  emits: ['nav-to']
}
</script>

<style scoped>
.app-footer {
  background-color: #14213D;
  color: #E5E5E5;
  padding: 2rem 0;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section h3,
.footer-section h4 {
  color: #FFFFFF;
  /* Títulos en blanco para mayor contraste */
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  border-bottom: 2px solid #FCA311;
  /* Borde naranja de acento */
  display: inline-block;
  padding-bottom: 0.5rem;
}

.footer-section h4 {
  font-size: 1.25rem;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #E5E5E5;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #FCA311;
}

.social-links {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  font-size: 1.5rem;
}

.social-link {
  color: #E5E5E5;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-link:hover {
  color: #FCA311;
  transform: translateY(-2px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 2rem;
  padding-top: 1.5rem;
  text-align: center;
  color: #7f8c8d;
}

.footer-bottom .copyright {
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>