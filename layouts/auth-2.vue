<script>
/**
 * Auth-2 layout
 */
export default {
    mounted() {
        document.body.classList.add('auth-fluid-pages')
    }
}
</script>

<template>
<div class="auth-fluid">
    <!-- Auth fluid right content -->
    <div class="auth-fluid-right">
        <div class="auth-user-testimonial">
            <h3 class="mb-3 text-white">Tão importante quanto o destino é o caminho que escolhemos.</h3>
            <p class="lead font-weight-normal"><i class="mdi mdi-format-quote-open"></i>E a <strong>Brclog</strong> é a <strong>melhor aliada </strong>para quem precisa estar no <strong>lugar certo</strong>, do <strong>jeito certo</strong>, na <strong>hora certa</strong>, prezando por segurança, transparência e competitividade. A história da <strong>Brclog</strong> teve início com a crescente demanda do fluxo de transporte e armazenagem de produtos dos nossos clientes. <i class="mdi mdi-format-quote-close"></i>
            </p>
            <h5 class="text-white">
                - BRCLog
            </h5>
        </div> <!-- end auth-user-testimonial-->
    </div>
    <!-- end Auth fluid right content -->

    <!--Auth fluid left content -->
    <div class="auth-fluid-form-box">
        <div class="align-items-center d-flex h-100">
            <div class="card-body">
                <Nuxt />
            </div>
        </div>
    </div>
</div>
</template>
