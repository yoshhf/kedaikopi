document.addEventListener('alpine:init', () => {
    Alpine.data('products' , () => ({
        items: [
                { id: 1, name: 'teh', img:'img/product/6.jpg', price: 15000},
                { id: 2, name: 'latte', img:'img/product/4.jpg', price: 15000},
                { id: 3, name: 'Brownies', img:'img/product/1.jpg', price: 5000},
                { id: 4, name: 'kue kering', img:'img/product/2.jpg', price: 5000},
                { id: 5, name: 'croissant', img:'img/product/3.jpg', price: 11000},
                { id: 6, name: 'pie', img:'img/product/5.jpg', price: 9000},
        ],
    }))

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,
        customerName: '',
        tableNumber: '',
        add(newItem) {
            const cartitem = this.items.find((item) => item.id === newItem.id);

            if(!cartitem) {
                this.items.push({...newItem, quantity: 1, total: newItem.price });
                this.quantity++;
                this.total += newItem.price;
            } else {
                this.items = this.items.map((item) => {
                    if (item.id !== newItem.id) {
                        return item;
                    } else {
                        item.quantity++;
                        item.total = item.price * item.quantity; 
                        this.quantity++;
                        this.total += item.price;
                        return item;  
                    }
                });
            }
        },
        remove(id) {
            const cartItem = this.items.find((item) => item.id === id);

            if(cartItem.quantity > 1) {
                this.items = this.items.map((item) => {
                    if(item.id !== id) {
                        return item;
                    } else {
                        item.quantity--;
                        item.total = item.price * item.quantity;
                        this.quantity--;
                        this.total -= item.price;
                        return item;
                    }
                });
            } else if (cartItem.quantity === 1) {
                this.items = this.items.filter((item) => item.id !== id);
                this.quantity--;
                this.total -= cartItem.price;
            }
        },
        async kirimPesanan() {
            const ringkasanKeranjang = this.items.map(item => 
                `${item.name} (x${item.quantity}) - ${rupiah(item.total)}`
            ).join('\n');
            
            const pesan = `
Detail Pesanan:
Nama Pelanggan: ${this.customerName}
Nomor Meja: ${this.tableNumber}
Produk:
${ringkasanKeranjang}
Total: ${rupiah(this.total)}
            `;

            const botToken = '7515572368:AAHOAsZwUowieZXxmt6p7-Rn6TdrgoXIyWc';  // ganti dengan token bot Anda
            const chatId = '-4527323091';      // ganti dengan ID chat Anda
            
            const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: pesan,
                    parse_mode: 'Markdown',  
                }),
            });

            if (response.ok) {
                alert('Pesanan berhasil dikirim!');
            } else {
                alert('Gagal mengirim pesanan. Silakan coba lagi.');
            }
        }
    });
});

// Fungsi untuk format harga ke Rupiah
const rupiah = (Number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(Number);
}
