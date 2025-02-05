<div class="vltava-service">
    <a href="" class="vltava-service-card">
        <div class="vltava-service-card-content">
            <img src="{{ asset('images/service1.png') }}" alt="" class="vltava-service-card-image">
            <div class="vltava-service-card-label">
                <span>Залишити відгук</span>
            </div>
        </div>
    </a>
    <a href="" class="vltava-service-card">
        <div class="vltava-service-card-content">
            <img src="{{ asset('images/service2.png') }}" alt="" class="vltava-service-card-image">
            <div class="vltava-service-card-label">
                <span>Забронювати столик</span>
            </div>
        </div>
    </a>
    <a href="" class="vltava-service-card">
        <div class="vltava-service-card-content">
            <img src="{{ asset('images/service3.png') }}" alt="" class="vltava-service-card-image">
            <div class="vltava-service-card-label">
                <span>Співпраця/Вакансії</span>
            </div>
        </div>
    </a>
</div>
@push('styles')
    @vite('resources/sass/components/vltava-service.scss')
@endpush
