interface Image {
  url: string; 
  cloudinary_id: string;
}


export interface IMessage {
  message_id: number;
  message_title: string;
  message_body: string;
  created_at: Date;
  link: string;
  message_type: number;
  yes_button_text: string;
  yes_button_text_en: string;
  no_button_text: string;
  no_button_text_en: string;
  pinned_until: string | null;
  send_push: boolean;
  icon_url: string;
  header_image_url: string;
  message_pinned: boolean
  image: Image
}

export interface ICreateMessage {
  message_title: string;
  message_body: string;
  link: string;
  message_type: number;
  yes_button_text: string;
  yes_button_text_en: string;
  no_button_text: string;
  no_button_text_en: string;
  pinned_until: string | null;
  send_push: boolean;
  icon_url: File | null;
  header_image_url: File | null;
  message_pinned: boolean;
}
