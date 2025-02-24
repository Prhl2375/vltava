<div class="vltava-banner">
    <div class="swiper">
        <div class="swiper-wrapper">
            @foreach ($banners as $banner)
                <div class="swiper-slide">
                    <img class="swiper-slide-image-desktop" src="{{ Storage::url($banner['desktop_image']) }}"
                        alt="{{ $banner['mobile_image'] }}">
                    <img class="swiper-slide-image-mobile" src="{{ Storage::url($banner['mobile_image']) }}"
                        alt="{{ $banner['mobile_image'] }}">
                    <div class="swiper-slide-content">
                        {!! $banner['text'] !!}
                    </div>
                </div>
            @endforeach
        </div>
        <!-- Optional Navigation -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
    </div>
</div>
@push('styles')
    @vite('resources/sass/components/vltava-banner.scss')
@endpush
@push('scripts')
    @vite('resources/js/components/vltava-banner.js')
@endpush
