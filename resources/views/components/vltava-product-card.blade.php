@php
    $path = $product->main_image;
    $hasImage = $path && Storage::disk('public')->exists($path);
@endphp
<a href="#" class="vltava-product-card">
    <div class="vltava-product-card-content">
        @if($hasImage)
            <img src="{{ Storage::url($product->main_image) }}" alt="{{$product['name']}}" class="vltava-product-card-image">
        @else
            <div class="vltava-product-card-image-placeholder">
                {{$product['name']}}
            </div>
        @endif
        <h3 class="vltava-product-card-title">{{$product['name']}}</h3>
        <div class="vltava-product-card-description">
            {{$product['description']}}
        </div>
        <div class="vltava-product-card-button">
            @foreach($product->prices as $price)
                {{$price}}₴
                @if(!$loop->last)
                    |
                @endif
            @endforeach
        </div>
    </div>
</a>
@push('styles')
    @vite('resources/sass/components/vltava-product-card.scss')
@endpush
