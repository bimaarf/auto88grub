<?php

namespace App\Filament\Resources\Main\DocumentResource\Pages;

use App\Filament\Resources\Main\DocumentResource;
use Filament\Resources\Pages\ManageRecords;

class ManageDocuments extends ManageRecords
{
    protected static string $resource = DocumentResource::class;

    protected function getActions(): array
    {
        return [
            \Filament\Actions\CreateAction::make()->createAnother(false),
        ];
    }

    public function getTabs(): array
    {
        return [
            'BPKB' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'bpkb')),
            'STNK' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'stnk')),
            'Notice Pajak' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'notice_pajak')),
            'SH' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'sh')),
            'Gesekan' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'gesekan')),
            'Kwitansi' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'kwitansi')),
            'Faktur' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'faktur')),
            'Sertifikat NIK' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'sertifikat_nik')),
            'KTP Pembeli' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'ktp_pembeli')),
            'Kir' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'kir')),
            'Kartu Uji Timbang' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'kartu_uji_timbang')),
            'Surat Buka Blokir (Samsat)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'surat_buka_blokir_samsat')),
            'Surat Buka Blokir (Leasing)' => \Filament\Resources\Components\Tab::make()->query(fn ($query) => $query->where('category', 'surat_buka_blokir_leasing')),
        ];
    }
}
