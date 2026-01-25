import { TextInput } from "@components/text-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModal } from "@hooks/use-modal";
import { Button } from "flowbite-react";
import { Upload } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import ReactCrop, { type Crop } from "react-image-crop";
import { z } from "zod";
import "./react-crop.css";

type UploadedImageType = {
  src: string;
  fileName: string;
};

const productFormSchema = z.object({
  name: z.string("Campo obrigatório"),
  price: z.number("Campo obrigatório").min(0, "Valor mínimo: 0"),
});

type ProductFormType = z.infer<typeof productFormSchema>;

export function ProductForm({ id, fetchProducts }: { id?: string; fetchProducts: () => void }) {
  const { closeModal } = useModal();

  const [uploadedImage, setUploadedImage] = useState<UploadedImageType | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  });

  const imageRef = useRef<HTMLImageElement>(null);

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormType>({
    resolver: zodResolver(productFormSchema),
  });

  function onMediaSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;
    if (!files) return;

    setUploadedImage({
      src: URL.createObjectURL(files[0]),
      fileName: files[0].name,
    });
  }

  function submitForm(formData: ProductFormType) {
    window.api.product
      .upsert({
        id,
        data: {
          ...formData,
          priceInCents: formData.price * 100,
        },
      })
      .then(() => {
        fetchProducts();
        closeModal();
      });
  }

  useEffect(() => {
    if (!id) return;

    window.api.product.getById(id).then((response) =>
      reset({
        name: response.name,
        price: response.priceInCents / 100,
      }),
    );
  }, [id]);

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(submitForm)}>
      <div>
        <label htmlFor="name" className="block mb-1">
          Nome *
        </label>
        <TextInput {...register("name")} id="name" />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1">
          Preço *
        </label>
        <TextInput
          {...register("price", {
            valueAsNumber: true,
          })}
          id="price"
          type="number"
          step="any"
        />
      </div>

      <div className="flex flex-col">
        <p className="block my-2">Imagem</p>
        {uploadedImage ? (
          <>
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              keepSelection
              aspect={1}
              className="overflow-hidden rounded mb-4 max-h-[300px]"
            >
              <img src={uploadedImage.src} ref={imageRef} draggable={false} />
            </ReactCrop>

            <div className="flex items-center justify-between gap-3">
              <span
                className="block text-ellipsis whitespace-nowrap overflow-hidden"
                title={uploadedImage.fileName}
              >
                <strong>Imagem:</strong> {uploadedImage.fileName}
              </span>

              <label
                htmlFor="image"
                className="cursor-pointer whitespace-nowrap text-blue-700 transition-colors hover:text-blue-600 hover:underline"
              >
                Escolher outra
              </label>
            </div>
          </>
        ) : (
          <label
            htmlFor="image"
            className="flex flex-col items-center justify-center gap-2 min-h-24 w-full border-2 border-dashed border-gray-400 rounded cursor-pointer group hover:bg-gray-100 hover:border-gray-600 transition-colors"
          >
            <Upload className="w-8 h-8 text-gray-500 transition-colors group-hover:text-gray-600" />
            <span>Faça upload de uma imagem para o produto</span>
          </label>
        )}

        <input
          onChange={onMediaSelected}
          type="file"
          id="image"
          accept="image/*"
          className="hidden w-0 h-0"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <Button type="button" color="alternative" onClick={() => closeModal()}>
          Cancelar
        </Button>

        <Button type="submit">Salvar produto</Button>
      </div>
    </form>
  );
}
