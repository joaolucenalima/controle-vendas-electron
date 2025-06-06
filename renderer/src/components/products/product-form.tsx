import { Upload } from "lucide-react";
import { ChangeEvent, useRef, useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import { useModal } from "../../contexts/ModalContext";
import { maskCurrency } from "../../utils/mask-inputs";
import { TextInput } from "../text-input";

type UploadedImageType = {
  src: string;
  fileName: string;
}

export function ProductForm({ id }: { id?: string }) {
  const [uploadedImage, setUploadedImage] = useState<UploadedImageType | null>(null)
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 0,
    y: 0,
    width: 80,
    height: 64
  })

  const { closeModal } = useModal();
  const imageRef = useRef<HTMLImageElement>(null)

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files) return

    setUploadedImage({
      src: URL.createObjectURL(files[0]),
      fileName: files[0].name
    })
  }

  return (
    <form className="flex flex-col gap-2">
      <div>
        <label htmlFor="name" className="block mb-1">Nome *</label>
        <TextInput id="name" name="name" />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1">Preço *</label>
        <TextInput
          id="price"
          name="price"
          onChange={maskCurrency}
          defaultValue="R$ 0,00"
        />
      </div>

      <div>
        <p className="block mb-2 mt-2">Imagem</p>
        {uploadedImage ? (
          <ReactCrop
            crop={crop}
            onChange={c => setCrop(c)}
            aspect={1}
            keepSelection
          >
            <img src={uploadedImage.src} ref={imageRef} draggable={false} />
          </ReactCrop>
        ) : (
          <>

          </>
        )}
        <label
          htmlFor="image"
          className="flex flex-col items-center justify-center gap-2 min-h-24 w-full border-2 border-dashed border-gray-400 rounded cursor-pointer group hover:bg-gray-100 hover:border-gray-600 transition-colors"
        >
          <Upload className="w-8 h-8 text-gray-500 transition-colors group-hover:text-gray-600" />
          <span>Faça upload de uma imagem para o produto</span>
        </label>
        <input
          onChange={onMediaSelected}
          type="file"
          id="image"
          accept="image/*"
          className="hidden w-0 h-0"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <button
          type="button"
          className="border border-gray-400 rounded px-4 py-2 text-black hover:bg-gray-200 transition-colors"
          onClick={() => closeModal()}
        >
          Cancelar
        </button>

        <button
          className="bg-green-500 text-white font-semibold rounded px-6 py-2 hover:bg-green-600 transition-colors"
          type="submit"
        >
          Salvar
        </button>
      </div>
    </form>
  )
}