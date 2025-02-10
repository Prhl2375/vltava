@props([
    'class' => null,
    'link' => '#',
    'content' => 'null',
])

<a href="{{ $link }}" class="vltava-button">
    <div class="vltava-button-content {{ $class }}">
        {{ $slot }}
    </div>
</a>
@push('styles')
    @vite('resources/sass/components/vltava-button.scss')
@endpush
