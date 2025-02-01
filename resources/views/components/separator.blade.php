@props(['title' => null])

<div class="separator">
    @isset($title)
        <h3> {{ $title }} </h3>
    @endisset
    <div class="separator-line" />
</div>
@push('styles')
    @vite('resources/sass/components/separator.scss')
@endpush
