<div class="swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="{{ Storage::url('images/banner1.jpg') }}" alt="Slide 1"></div>
        <div class="swiper-slide"><img src="{{ Storage::url('images/banner2.jpg') }}" alt="Slide 2"></div>
        <div class="swiper-slide"><img src="{{ Storage::url('images/banner3.jpg') }}" alt="Slide 3"></div>
    </div>
    <!-- Optional Navigation -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
    <div class="swiper-pagination"></div>
</div>
@push('styles')
    @vite('resources/sass/components/banner.scss')
@endpush
@push('scripts')
    @vite('resources/js/components/banner.js')
@endpush
